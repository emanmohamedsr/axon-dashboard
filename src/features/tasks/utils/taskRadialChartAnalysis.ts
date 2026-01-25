import type { Task } from "../types/task";

const chartColors = ["var(--chart-1)", "var(--chart-4)", "var(--chart-5)"];
export const TaskStatusCount = (tasks: Task[]) => {
	const statusCount: Record<"done" | "in-progress" | "todo", number> = {
		done: 0,
		"in-progress": 0,
		todo: 0,
	};
	tasks.forEach((task) => {
		if (task.status === "done") {
			statusCount.done += 1;
		} else if (task.status === "in-progress") {
			statusCount["in-progress"] += 1;
		} else if (task.status === "todo") {
			statusCount.todo += 1;
		}
	});

	return Object.entries(statusCount).map(([status, count], index) => ({
		status,
		count,
		fill: chartColors[index % chartColors.length],
	}));
};
