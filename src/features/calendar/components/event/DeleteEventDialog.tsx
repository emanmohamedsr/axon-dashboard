import { AlertDialog } from "@/shared/components";
import { useDeleteEventDialogStore } from "../../hooks/useDeleteEventDialog";

interface DeleteEventDialogProps {
	onConfirm: () => void;
}

const DeleteEventDialog = ({ onConfirm }: DeleteEventDialogProps) => {
	const { isOpen, setOpen } = useDeleteEventDialogStore();
	return (
		<AlertDialog
			open={isOpen}
			setOpen={setOpen}
			onSubmit={() => {
				onConfirm();
				setOpen(false);
			}}
			title='Delete Event'
			description='Are you sure you want to delete this event?'
		/>
	);
};

export default DeleteEventDialog;
