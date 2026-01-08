import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Iprops {
	title: string;
	description: string;
	onSubmit: () => void;
	open: boolean;
	setOpen: (open: boolean) => void;
}

const AlertDialog = ({
	title,
	description,
	onSubmit,
	open,
	setOpen,
}: Iprops) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogPortal>
				<DialogOverlay className='backdrop-blur-xs' />
				<DialogContent>
					<DialogHeader>
						<DialogTitle>🔔 {title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>
					<div className='flex justify-end gap-4 mt-4'>
						<Button
							variant={"destructive"}
							onClick={() => {
								onSubmit();
								setOpen(false);
								toast.success("Deleted successfully!");
							}}>
							Confirm
						</Button>
						<Button variant='outline' onClick={() => setOpen(false)}>
							Cancel
						</Button>
					</div>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	);
};

export default AlertDialog;
