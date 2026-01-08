import { create } from "zustand";
import type { Task } from "../types/task";

interface TaskModalStore {
	isEditModalOpen: boolean;
	taskToEdit: Task | null;
	setTaskToEdit: (task: Task | null) => void;
	onEditModalOpenChange: (open: boolean) => void;
}

const useTaskModalStore = create<TaskModalStore>()((set) => ({
	isEditModalOpen: false,
	taskToEdit: null,
	onEditModalOpenChange: (open: boolean) => set({ isEditModalOpen: open }),
	setTaskToEdit: (task: Task | null) => set({ taskToEdit: task }),
}));
export default useTaskModalStore;
