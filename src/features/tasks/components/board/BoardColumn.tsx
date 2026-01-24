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
			className={`overflow-y-auto shadow-md
				bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10
        flex flex-col gap-4 p-4 rounded-lg border
				${isWidgetMode ? "h-[600px]" : "h-[540px]"}
        ${
					isOver ?
						"bg-axon-lighter-blue border-axon-blue"
					:	"bg-gray-100/50 border-transparent"
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

			<div className='flex-1 overflow-y-auto'>
				<div className='flex flex-col gap-3 p-2'>
					{tasks.map((task) => (
						<TaskCard key={task.id} task={task} isWidgetMode={isWidgetMode} />
					))}
				</div>
			</div>
		</div>
	);
};

export default BoardColumn;
