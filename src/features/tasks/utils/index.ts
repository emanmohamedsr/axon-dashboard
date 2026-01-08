import type { TaskPriority, TaskStatus } from "../types/task";

export const TaskStatusMapping: Record<TaskStatus, string> = {
	"in-progress": " text-yellow-800 dark:text-yellow-300",
	done: "text-green-800 dark:text-green-300",
	todo: " text-blue-800 dark:text-blue-300",
};

export const TaskPriorityMapping: Record<
	TaskPriority,
	"secondary" | "default" | "destructive"
> = {
	low: "secondary",
	medium: "default",
	high: "destructive",
};

export function formatDateTime(dateString: string | Date | undefined) {
	if (!dateString) return "";
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return "";

	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "2-digit",
		year: "numeric",
	});
}
