import { create } from "zustand";
import type { Task } from "../types/task";

interface TaskAlertStore {
	isOpen: boolean;
	selectedTask: Task | null;
	onOpenChange: (open: boolean) => void;
	setSelectedTask: (task: Task | null) => void;
}

const useTaskAlertStore = create<TaskAlertStore>()((set) => ({
	isOpen: false,
	selectedTask: null,
	onOpenChange: (open: boolean) => set({ isOpen: open }),
	setSelectedTask: (task) => set({ selectedTask: task }),
}));
export default useTaskAlertStore;
