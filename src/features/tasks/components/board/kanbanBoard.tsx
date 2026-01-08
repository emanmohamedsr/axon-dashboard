import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import BoardColumn from "./BoardColumn";
import type { Task, TaskStatus } from "../../types/task";
import useTask from "../../hooks/useTaskStore";

interface KanbanBoardProps {
	isWidgetMode?: boolean;
}

const KanbanBoard = ({ isWidgetMode = false }: KanbanBoardProps) => {
	const { tasks, setTask } = useTask();

	const BOARD_COLUMNS = [
		{ id: "todo", title: "To Do" },
		{ id: "in-progress", title: "In Progress" },
		{ id: "done", title: "Done" },
	];
	const RenderBoardColumns = () => {
		return (
			<div
				className={`grid gap-6 h-full ${
					isWidgetMode
						? "grid-cols-1 max-h-[500px] overflow-auto"
						: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
				}`}>
				{BOARD_COLUMNS.map((column) => (
					<BoardColumn
						key={column.id}
						title={column.title}
						status={column.id as TaskStatus}
						tasks={tasks.filter((task) => task.status === column.id)}
					/>
				))}
			</div>
		);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;
		const newStatus = over.id;
		const currentTask = active.data.current as Task;
		if (currentTask && currentTask.status !== newStatus)
			setTask({ ...currentTask, status: newStatus as TaskStatus });
	};

	return (
		<DndContext onDragEnd={handleDragEnd}>{RenderBoardColumns()}</DndContext>
	);
};
export default KanbanBoard;
