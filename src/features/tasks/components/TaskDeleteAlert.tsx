import { AlertDialog } from "@/shared/components";
import useTaskAlertStore from "../hooks/useTaskAlertStore";
import useTask from "../hooks/useTaskStore";

const TaskDeleteAlert = () => {
	const deleteTask = useTask().deleteTask;
	const { isOpen, onOpenChange, selectedTask, setSelectedTask } =
		useTaskAlertStore();
	if (selectedTask) {
		const handleDeleteSubmit = () => {
			deleteTask(selectedTask.id);
			setSelectedTask(null);
			onOpenChange(false);
		};
		return (
			<AlertDialog
				title='Delete Task'
				description='Are you sure you want to delete this task?'
				onSubmit={handleDeleteSubmit}
				open={isOpen}
				setOpen={onOpenChange}
			/>
		);
	}
};

export default TaskDeleteAlert;
