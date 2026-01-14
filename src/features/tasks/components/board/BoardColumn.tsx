import { useDroppable } from "@dnd-kit/core";
import type { Task, TaskStatus } from "../../types/task";
import TaskCard from "./TaskCard";
import { ListTodo } from "lucide-react";

interface BoardColumnProps {
	isWidgetMode?: boolean;
	status: TaskStatus;
	title: string;
	tasks: Task[];
}

const BoardColumn = ({
	isWidgetMode = false,
	status,
	title,
	tasks,
}: BoardColumnProps) => {
	const { isOver, setNodeRef } = useDroppable({
		id: status,
	});

	return (
		<div
			ref={setNodeRef}
			className={`shadow-md
				bg-gray-100 dark:bg-white/10
        flex flex-col gap-4 p-4 rounded-lg border-2
        ${
					isOver
						? "bg-axon-lighter-blue border-axon-blue"
						: "bg-gray-100/50 border-transparent"
				}
        transition-colors
      `}>
			<h3 className='font-bold text-lg mb-2 capitalize'>{title}</h3>

			{tasks.length === 0 && (
				<div className='text-gray-400 h-[170px] text-center py-10 border-dashed border-2 rounded-md flex items-center gap-2 px-4'>
					<ListTodo />
					<p className='text-sm'>No tasks</p>
				</div>
			)}

			{tasks.map((task) => (
				<TaskCard key={task.id} task={task} isWidgetMode={isWidgetMode} />
			))}
		</div>
	);
};

export default BoardColumn;
