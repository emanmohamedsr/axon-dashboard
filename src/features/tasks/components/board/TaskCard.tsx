// TaskCard.tsx
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
	isWidgetMode?: boolean;
	isOverlay?: boolean;
}

const TaskCard = ({
	task,
	isWidgetMode = false,
	isOverlay = false,
}: TaskCardProps) => {
	// Hooks
	const { setSelectedTask, onOpenChange } = useTaskAlertStore();
	const { onEditModalOpenChange, setTaskToEdit } = useTaskModalStore();

	// Handlers
	const handleDeleteTask = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		onOpenChange(true);
		setSelectedTask(task);
	};

	const handleEditTask = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		onEditModalOpenChange(true);
		setTaskToEdit(task);
	};

	const stopDragPropagation = (e: PointerEvent<HTMLButtonElement>) => {
		e.stopPropagation();
	};

	const draggable = useDraggable({
		id: task.id,
		data: task,
		disabled: isOverlay,
	});

	const { attributes, listeners, setNodeRef, transform, isDragging } =
		draggable;

	const style = {
		opacity: isDragging ? 0.1 : 1,
		transform:
			transform && !isOverlay ?
				`translate3d(${transform.x}px, ${transform.y}px, 0)`
			:	undefined,
		zIndex: isOverlay ? 999 : undefined,
	};

	return (
		<div
			ref={!isOverlay ? setNodeRef : undefined}
			{...(!isOverlay ? attributes : {})}
			{...(!isOverlay ? listeners : {})}
			style={style}
			className={`rounded-md shadow-md bg-white/90 dark:bg-white/10 ${isOverlay ? "cursor-grabbing rotate-2 scale-105" : "cursor-grab"}`}>
			<div
				className={`h-10 w-full rounded-t-md flex justify-end items-center px-2`}
				style={{ backgroundColor: task.bgColor }}>
				<Button
					disabled={isWidgetMode}
					onPointerDown={stopDragPropagation}
					onClick={handleEditTask}
					variant='ghost'
					size='icon'
					className='hover:bg-transparent hover:opacity-80'>
					<Edit className='w-4 h-4 text-gray-600 dark:text-gray-400' />
				</Button>
				<Button
					disabled={isWidgetMode}
					onPointerDown={stopDragPropagation}
					onClick={handleDeleteTask}
					variant='ghost'
					size='icon'
					className='hover:bg-transparent hover:opacity-80'>
					<Trash2 className='w-4 h-4 text-destructive' />
				</Button>
			</div>
			<div className='p-4 pt-0'>
				<h3 className='mt-2 font-semibold text-sm sm:text-lg text-axon-text-color'>
					{task.name}
				</h3>
				<p className='mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
					{task.description}
				</p>
				{task.dueDate ?
					<div className='flex items-center mt-4 text-gray-600 dark:text-gray-400'>
						<Calendar className='text-axon-dark-rose w-4 h-4 mr-1' />
						<span className='ml-1 text-sm text-gray-700 dark:text-gray-300'>
							{formatDateTime(task.dueDate)}
						</span>
					</div>
				:	<CalendarOff className='text-axon-dark-rose w-4 h-4 mt-4 ' />}
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
