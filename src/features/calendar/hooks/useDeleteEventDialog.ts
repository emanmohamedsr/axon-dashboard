import { create } from "zustand";

interface DeleteEventDialogState {
	isOpen: boolean;
	setOpen: (isOpen: boolean) => void;
}

export const useDeleteEventDialogStore = create<DeleteEventDialogState>(
	(set) => ({
		isOpen: false,
		setOpen: (isOpen: boolean) => set({ isOpen }),
	}),
);
