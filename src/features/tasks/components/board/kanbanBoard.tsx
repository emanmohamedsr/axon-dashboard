// KanbanBoard.tsx
import {
	DndContext,
	DragOverlay,
	type DragEndEvent,
	type DragStartEvent,
} from "@dnd-kit/core";
import BoardColumn from "./BoardColumn";
import type { Task, TaskStatus } from "../../types/task";
import useTask from "../../hooks/useTaskStore";
import { useState } from "react";
import TaskCard from "./TaskCard";

interface KanbanBoardProps {
	isWidgetMode?: boolean;
}

const KanbanBoard = ({ isWidgetMode = false }: KanbanBoardProps) => {
	const { tasks, setTask } = useTask();

	const [activeTask, setActiveTask] = useState<Task | null>(null);

	const BOARD_COLUMNS = [
		{ id: "todo", title: "To Do" },
		{ id: "in-progress", title: "In Progress" },
		{ id: "done", title: "Done" },
	];

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		if (active.data.current) {
			setActiveTask(active.data.current as Task);
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		setActiveTask(null);

		if (!over) return;
		const newStatus = over.id;
		const currentTask = active.data.current as Task;
		if (currentTask && currentTask.status !== newStatus)
			setTask({ ...currentTask, status: newStatus as TaskStatus });
	};

	const RenderBoardColumns = () => {
		return (
			<div
				className={`grid gap-6 h-full ${
					isWidgetMode ?
						"grid-cols-1 max-h-[325px] overflow-auto"
					:	"grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
				}`}>
				{BOARD_COLUMNS.map((column) => (
					<BoardColumn
						isWidgetMode={isWidgetMode}
						key={column.id}
						title={column.title}
						status={column.id as TaskStatus}
						tasks={tasks.filter((task) => task.status === column.id)}
					/>
				))}
			</div>
		);
	};

	return (
		<DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
			{RenderBoardColumns()}
			<DragOverlay>
				{activeTask ?
					<TaskCard
						task={activeTask}
						isWidgetMode={isWidgetMode}
						isOverlay={true}
					/>
				:	null}
			</DragOverlay>
		</DndContext>
	);
};
export default KanbanBoard;
