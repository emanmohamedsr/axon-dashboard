import useTaskModalStore from "../hooks/useTaskModalStore";
import TaskDialog from "./TaskDialog";

const TaskEditAddDialog = () => {
	const { taskToEdit, isEditModalOpen, onEditModalOpenChange, setTaskToEdit } =
		useTaskModalStore();

	const handleColseEditModal = () => {
		onEditModalOpenChange(false);
		setTaskToEdit(null);
	};
	return (
		<TaskDialog
			task={taskToEdit || undefined}
			open={isEditModalOpen}
			onOpenChange={onEditModalOpenChange}
			onClose={handleColseEditModal}
		/>
	);
};

export default TaskEditAddDialog;
