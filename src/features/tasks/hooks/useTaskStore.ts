import { create } from "zustand";
import type { Task } from "../types/task";
import tasks from "../data/tasksMockData";
interface TaskState {
	tasks: Task[];
	setTask: (task: Task) => void;
	deleteTask: (id: string) => void;
}

const useTask = create<TaskState>((set) => ({
	tasks,
	setTask: (task) =>
		set((state) => ({
			tasks:
				state.tasks.findIndex((t) => t.id === task.id) !== -1 ?
					[...state.tasks.map((t) => (t.id === task.id ? task : t))]
				:	[task, ...state.tasks],
		})),

	deleteTask: (id) =>
		set((state) => ({
			tasks: state.tasks.filter((t) => t.id !== id),
		})),
}));

export default useTask;
