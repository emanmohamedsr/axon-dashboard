import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { TeamMember } from "../types/team-member";

import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { roleVariantMap, statusVariantMap } from "@/features/team/constants";
import useTeam from "@/features/team/hooks/useTeam";
import { AlertDialog, DataTableColumnHeader } from "@/shared/components";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import TeamDialog from "./TeamDialog";

const getColumns = (isWidgetMode: boolean = false): ColumnDef<TeamMember>[] => {
	const columns: ColumnDef<TeamMember>[] = [
		{
			id: "select-all",
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
			accessorKey: "location",
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title='Location'
					className='text-axon-light-blue font-bold text-lg'
				/>
			),
			cell: (info) =>
				(info.getValue() as TeamMember["location"])?.displayName || "Not Set",
		},
		{
			accessorKey: "status",
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title='Status'
					className='text-axon-dark-rose font-bold text-lg'
				/>
			),
			cell: (info) => (
				<span
					className={statusVariantMap[info.getValue() as TeamMember["status"]]}>
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
						variant={roleVariantMap[info.getValue() as TeamMember["role"]]}>
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
				const [openAlert, setOpenAlert] = useState(false);
				return (
					<>
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
									onClick={() =>
										navigator.clipboard.writeText(teamMember.email)
									}>
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
									<div
										className='flex items-center gap-2'
										onClick={() => setOpenAlert(true)}>
										<Trash className='w-[1.2rem] h-[1.2rem] text-destructive' />
										<span className='text-destructive'>Delete</span>
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<AlertDialog
							title='Delete Team Member'
							description='Are you sure you want to delete this team member? This action cannot be undone.'
							onSubmit={() => {
								deleteTeamMember(row.original.id);
								setOpen(false);
							}}
							open={openAlert}
							setOpen={setOpenAlert}
						/>
					</>
				);
			},
		},
	];

	return isWidgetMode
		? columns.filter(
				(column) => column.id !== "select-all" && column.id !== "actions",
		  )
		: columns;
};
export default getColumns;
