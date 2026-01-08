import { Calendar, CalendarOff, Edit, Trash2 } from "lucide-react";
import type { Task } from "../../types/task";
import {
	formatDateTime,
	TaskPriorityMapping,
	TaskStatusMapping,
} from "../../utils";
import { Badge } from "@/components/ui/badge";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import useTaskAlertStore from "../../hooks/useTaskAlertStore";
import type { MouseEvent, PointerEvent } from "react";
import useTaskModalStore from "../../hooks/useTaskModalStore";
interface TaskCardProps {
	task: Task;
}
const TaskCard = ({ task }: TaskCardProps) => {
	const { setSelectedTask, onOpenChange } = useTaskAlertStore();
	const handleDeleteTask = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		onOpenChange(true);
		setSelectedTask(task);
	};

	const { onEditModalOpenChange, setTaskToEdit } = useTaskModalStore();
	const handleEditTask = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		onEditModalOpenChange(true);
		setTaskToEdit(task);
	};

	const stopDragPropagation = (e: PointerEvent<HTMLButtonElement>) => {
		e.stopPropagation();
	};

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task.id,
		data: task,
	});

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
				zIndex: 100,
		  }
		: undefined;

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
			className='rounded-md shadow-md bg-white/90 dark:bg-white/10 min-h-[170px]'>
			<div
				className={`h-10 w-full rounded-t-md flex justify-end items-center px-2`}
				style={{
					backgroundColor: task.bgColor,
				}}>
				<Button
					onPointerDown={stopDragPropagation}
					onClick={handleEditTask}
					variant='ghost'
					size='icon'
					className='hover:bg-transparent hover:opacity-80'>
					<Edit className='w-4 h-4 text-gray-600 dark:text-gray-400' />
				</Button>
				<Button
					onPointerDown={stopDragPropagation}
					onClick={handleDeleteTask}
					variant='ghost'
					size='icon'
					className='hover:bg-transparent hover:opacity-80'>
					<Trash2 className='w-4 h-4 text-destructive' />
				</Button>
			</div>
			<div className='p-4 pt-0'>
				<h3 className='mt-2 font-semibold text-lg text-axon-text-color'>
					{task.name}
				</h3>
				<p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
					{task.description}
				</p>
				{task.dueDate ? (
					<div className='flex items-center mt-4 text-gray-600 dark:text-gray-400'>
						<Calendar className='text-axon-dark-rose w-4 h-4 mr-1' />
						<span className='ml-1 text-sm text-gray-700 dark:text-gray-300'>
							{formatDateTime(task.dueDate)}
						</span>
					</div>
				) : (
					<CalendarOff className='text-axon-dark-rose w-4 h-4 mt-4 ' />
				)}
				<div className='flex justify-between items-center gap-4 mt-4'>
					<span className={`${TaskStatusMapping[task.status]}`}>
						{task.status}
					</span>
					<Badge variant={TaskPriorityMapping[task.priority]}>
						{task.priority}
					</Badge>
				</div>
			</div>
		</div>
	);
};

export default TaskCard;
