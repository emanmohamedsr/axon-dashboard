import type { Task } from "../types/task";

//  const chartData = [
// 	{ priority: "High", done: 150, inProgress: 240, todo: 140 },
// 	{ priority: "Medium", done: 305, inProgress: 200, todo: 100 },
// 	{ priority: "Low", done: 237, inProgress: 120, todo: 90 },
// ];

export const getTasksPriorityStatusData = (tasks: Task[]) => {
	let priorityStatusMap: Record<
		"high" | "medium" | "low",
		{ done: number; inProgress: number; todo: number }
	> = {
		high: { done: 0, inProgress: 0, todo: 0 },
		medium: { done: 0, inProgress: 0, todo: 0 },
		low: { done: 0, inProgress: 0, todo: 0 },
	};
	tasks.forEach((task) => {
		const priority = task.priority;
		const status = task.status;
		if (status === "done") {
			priorityStatusMap[priority].done += 1;
		} else if (status === "in-progress") {
			priorityStatusMap[priority].inProgress += 1;
		} else if (status === "todo") {
			priorityStatusMap[priority].todo += 1;
		}
	});

	return [
		{ priority: "High", ...priorityStatusMap["high"] },
		{ priority: "Medium", ...priorityStatusMap["medium"] },
		{ priority: "Low", ...priorityStatusMap["low"] },
	];
};

export const getTotalDoneTasks = (tasks: Task[]) => {
	return tasks.reduce(
		(count, task) => (task.status === "done" ? count + 1 : count),
		0,
	);
};
