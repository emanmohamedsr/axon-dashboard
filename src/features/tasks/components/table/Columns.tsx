import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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
import { DataTableColumnHeader } from "@/shared/components";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import useTaskAlertStore from "../../hooks/useTaskAlertStore";
import useTaskModalStore from "../../hooks/useTaskModalStore";
import type { Task } from "../../types/task";
import { TaskPriorityMapping, TaskStatusMapping } from "../../utils";

const getColumns = (isWidgetMode: boolean = false): ColumnDef<Task>[] => {
	const { setSelectedTask, onOpenChange } = useTaskAlertStore();

	const columns: ColumnDef<Task>[] = [
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
			accessorKey: "description",
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title='Description'
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
				<span className={TaskStatusMapping[info.getValue() as Task["status"]]}>
					{info.getValue() as string}
				</span>
			),
		},
		{
			accessorKey: "priority",
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title='Priority'
					className='text-axon-rose text-center font-bold text-lg'
				/>
			),
			cell: (info) => {
				info.getValue();
				return (
					<Badge
						className='w-20'
						variant={TaskPriorityMapping[info.getValue() as Task["priority"]]}>
						{info.getValue() as string}
					</Badge>
				);
			},
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const task = row.original;
				const handleDeleteTask = () => {
					onOpenChange(true);
					setSelectedTask(task);
				};
				const { onEditModalOpenChange, setTaskToEdit } = useTaskModalStore();
				const handleEditTask = () => {
					onEditModalOpenChange(true);
					setTaskToEdit(task);
				};
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
							<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
								<div
									className='flex items-center gap-2'
									onClick={handleEditTask}>
									<Edit className='w-[1.2rem] h-[1.2rem]' />
									<span>Edit</span>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
								<div
									className='flex items-center gap-2'
									onClick={handleDeleteTask}>
									<Trash className='w-[1.2rem] h-[1.2rem] text-destructive' />
									<span className='text-destructive'>Delete</span>
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
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
