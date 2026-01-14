import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskTable from "./table/TaskTable";
import TaskDeleteAlert from "./TaskDeleteAlert";
import TaskEditAddDialog from "./TaskEditAddDialog";
import useTaskModalStore from "../hooks/useTaskModalStore";
import { KanbanBoard } from "@/features/tasks/components";
const TasksView = () => {
	const { onEditModalOpenChange, setTaskToEdit } = useTaskModalStore();
	const handleAddNewTask = () => {
		onEditModalOpenChange(true);
		setTaskToEdit(null);
	};
	return (
		<>
			<Tabs defaultValue='kanban' className='w-full'>
				<div className='flex flex-col gap-4'>
					<TabsList>
						<TabsTrigger value='kanban'>Kanban</TabsTrigger>
						<TabsTrigger value='table'>Table</TabsTrigger>
					</TabsList>
					<Button
						className='mr-auto'
						variant={"primary"}
						onClick={handleAddNewTask}>
						Add New Task
					</Button>

					<TabsContent className='mt-4' value='kanban'>
						<KanbanBoard />
					</TabsContent>
					<TabsContent className='mt-4' value='table'>
						<TaskTable />
					</TabsContent>
				</div>
			</Tabs>
			<TaskEditAddDialog />
			<TaskDeleteAlert />
		</>
	);
};

export default TasksView;
