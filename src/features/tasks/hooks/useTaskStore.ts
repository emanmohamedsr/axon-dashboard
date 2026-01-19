import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { Task, TaskStatus } from "../types/task";

interface TaskState {
	tasks: Task[];
	setTask: (task: Task) => void;
	deleteTask: (id: string) => void;
}

const StatusColors: Record<TaskStatus, string> = {
	todo: "#DBEAFE",
	"in-progress": "#FEF3C7",
	done: "#D1FAE5",
};

const daysFromNow = (days: number) =>
	new Date(new Date().setDate(new Date().getDate() + days));
const pastDate = (days: number) =>
	new Date(new Date().setDate(new Date().getDate() - days));

const useTask = create<TaskState>((set) => ({
	tasks: [
		{
			id: uuidv4(),
			name: "Fix critical bug in payment gateway",
			description:
				"Users are reporting errors during checkout process defined steps.",
			status: "todo",
			priority: "high",
			dueDate: daysFromNow(2),
			bgColor: StatusColors.todo,
		},
		{
			id: uuidv4(),
			name: "Security audit preparation",
			description:
				"Review access logs and prepare documentation for upcoming audit.",
			status: "in-progress",
			priority: "high",
			dueDate: daysFromNow(5),
			bgColor: StatusColors["in-progress"],
		},

		{
			id: uuidv4(),
			name: "Implement Authentication",
			description:
				"Set up OAuth2 authentication with Google and GitHub providers.",
			status: "in-progress",
			priority: "medium",
			dueDate: daysFromNow(10),
			bgColor: StatusColors["in-progress"],
		},
		{
			id: uuidv4(),
			name: "Design Landing Page",
			description:
				"Create high-fidelity mockups for the new marketing landing page.",
			status: "todo",
			priority: "medium",
			dueDate: daysFromNow(14),
			bgColor: StatusColors.todo,
		},
		{
			id: uuidv4(),
			name: "Refactor API endpoints",
			description: "Optimize existing REST API responses for mobile clients.",
			status: "done",
			priority: "medium",
			dueDate: pastDate(2),
			bgColor: StatusColors.done,
		},

		{
			id: uuidv4(),
			name: "Database Optimization",
			description: "Run analysis on slow queries and add necessary indexes.",
			status: "todo",
			priority: "low",
			dueDate: daysFromNow(30),
			bgColor: StatusColors.todo,
		},
		{
			id: uuidv4(),
			name: "Update Documentation",
			description:
				"Review and update the `README.md` and contribution guidelines.",
			status: "done",
			priority: "low",
			dueDate: pastDate(5),
			bgColor: StatusColors.done,
		},
		{
			id: uuidv4(),
			name: "TeamAvatar component",
			description: "Create a reusable avatar component showing user initials.",
			status: "done",
			priority: "low",
			dueDate: pastDate(1),
			bgColor: StatusColors.done,
		},
	],

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
