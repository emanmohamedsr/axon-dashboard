import { create } from "zustand";
import { type Task, type TaskPriority, type TaskStatus } from "../types/task";
import { v4 as uuidv4 } from "uuid";

export interface TaskState {
	tasks: Task[];
	setTask: (task: Task) => void;
	deleteTask: (id: string) => void;
}

const useTask = create<TaskState>((set) => ({
	tasks: [
		{
			id: uuidv4(),
			name: "Design Landing Page",
			description: "Design a new landing page.",
			status: "in-progress" as TaskStatus,
			priority: "high" as TaskPriority,
			dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
			bgColor: "#FFEECC",
		},
		{
			id: uuidv4(),
			name: "Implement Authentication",
			description: "Set up OAuth2 authentication with Google",
			status: "todo" as TaskStatus,
			priority: "medium" as TaskPriority,
			dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
			bgColor: "#CCE5FF",
		},
		{
			id: uuidv4(),
			name: "Database Optimization",
			description: "Optimize database queries for faster load times.",
			status: "done" as TaskStatus,
			priority: "low" as TaskPriority,
			dueDate: new Date(new Date().setDate(new Date().getDate() - 3)),
			bgColor: "#D5F5E3",
		},
		{
			id: uuidv4(),
			name: "Implement Authentication",
			description: "Set up OAuth2 authentication with Google.",
			status: "in-progress" as TaskStatus,
			priority: "high" as TaskPriority,
			dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
			bgColor: "#FFEECC",
		},
		{
			id: uuidv4(),
			name: "Implement Authentication",
			description: "Set up OAuth2 authentication with Google",
			status: "todo" as TaskStatus,
			priority: "medium" as TaskPriority,
			dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
			bgColor: "#CCE5FF",
		},
		{
			id: uuidv4(),
			name: "Database Optimization",
			description: "Optimize database queries for faster load times.",
			status: "done" as TaskStatus,
			priority: "low" as TaskPriority,
			dueDate: new Date(new Date().setDate(new Date().getDate() - 3)),
			bgColor: "#D5F5E3",
		},
	],
	setTask: (task) =>
		set((state) => ({
			tasks:
				state.tasks.findIndex((t) => t.id === task.id) !== -1
					? [...state.tasks.map((t) => (t.id === task.id ? task : t))]
					: [task, ...state.tasks],
		})),
	deleteTask: (id) =>
		set((state) => ({
			tasks: state.tasks.filter((t) => t.id !== id),
		})),
}));
export default useTask;
