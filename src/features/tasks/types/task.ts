export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
	id: string;
	name: string;
	description?: string;
	status: TaskStatus;
	priority: TaskPriority;
	dueDate?: Date | string;
	bgColor?: string;
}
