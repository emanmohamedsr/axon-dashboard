import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { team } from "@/pages/Team/data";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import TeamDialog from "./TeamDialog";
import AlertDialog from "@/shared/ui/AlertDialog";
import useTeam from "@/shared/hooks/team";
import { useState } from "react";
import { roleVariantMap, statusVariantMap } from "../constants";
export const columns: ColumnDef<team>[] = [
	{
		accessorKey: "select-all",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Name'
				className='text-axon-desaturated-blue font-bold text-lg'
			/>
		),
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Email'
				className='text-axon-blue font-bold text-lg'
			/>
		),
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Status'
				className='text-axon-light-blue font-bold text-lg'
			/>
		),
		cell: (info) => (
			<span className={statusVariantMap[info.getValue() as team["status"]]}>
				{info.getValue() as string}
			</span>
		),
	},
	{
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Role'
				className='text-axon-rose text-center font-bold text-lg'
			/>
		),
		cell: (info) => {
			info.getValue();
			return (
				<Badge
					className='w-20'
					variant={roleVariantMap[info.getValue() as team["role"]]}>
					{info.getValue() as string}
				</Badge>
			);
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const teamMember = row.original;
			const deleteTeamMember = useTeam((state) => state.deleteTeamMember);
			const [open, setOpen] = useState(false);
			return (
				<DropdownMenu open={open} onOpenChange={setOpen}>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel className='text-muted-foreground'>
							Actions
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(teamMember.email)}>
							<Copy className='w-[1.2rem] h-[1.2rem]' />
							Copy Email
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
							<TeamDialog
								onClose={() => setOpen(false)}
								teamMember={teamMember}>
								<div className='flex items-center gap-2'>
									<Edit className='w-[1.2rem] h-[1.2rem]' />
									<span>Edit</span>
								</div>
							</TeamDialog>
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
							<AlertDialog
								title='Delete Team Member'
								description='Are you sure you want to delete this team member? This action cannot be undone.'
								onSubmit={() => {
									deleteTeamMember(row.original.id);
									setOpen(false);
								}}>
								<div className='flex items-center gap-2'>
									<Trash className='w-[1.2rem] h-[1.2rem] text-destructive' />
									<span className='text-destructive'>Delete</span>
								</div>
							</AlertDialog>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
