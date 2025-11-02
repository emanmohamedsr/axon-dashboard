import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

interface Iprops {
	title: string;
	description: string;
	onSubmit: () => void;
	children: ReactNode;
}

const AlertDialog = ({ title, description, onSubmit, children }: Iprops) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
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
								toast.success("Team member deleted successfully!");
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
