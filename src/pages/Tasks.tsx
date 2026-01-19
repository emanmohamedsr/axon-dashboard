import TasksStackedBar from "@/features/tasks/charts/TasksStackedBar";
import TaskStatusRadial from "@/features/tasks/charts/TaskStatusRadial";
import TasksView from "@/features/tasks/components/TasksView";

const TasksPage = () => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-3 p-2 bg-muted/10 min-h-screen items-center'>
			<div className='col-span-1 lg:col-span-3'>
				<TasksView />
			</div>
			<div className='col-span-3 grid grid-cols-1 md:grid-cols-2 gap-3'>
				<TaskStatusRadial />
				<TasksStackedBar />
			</div>
		</div>
	);
};

export default TasksPage;
