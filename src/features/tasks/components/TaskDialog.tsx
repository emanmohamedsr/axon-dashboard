import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { ColorPicker, DatePicker } from "@/shared/components";
import { toast } from "sonner";
import { z } from "zod";
import useTask from "../hooks/useTaskStore";
import type { Task } from "../types/task";
import { useEffect } from "react";
const formSchema = z.object({
	id: z.string(),
	name: z.string().min(2).max(100),
	description: z.string().min(2).max(500),
	status: z.enum(["todo", "in-progress", "done"]),
	priority: z.enum(["low", "medium", "high"]),
	dueDate: z.string().optional(),
	bgColor: z.string().optional(),
});

interface Iprops {
	task?: Task;
	onClose?: () => void;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}
const TaskDialog = ({ task, open, onOpenChange, onClose }: Iprops) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: task?.id || uuidv4(),
			name: task?.name || "",
			description: task?.description || "",
			status: task?.status || "todo",
			priority: task?.priority || "low",
			dueDate: task?.dueDate ? new Date(task.dueDate).toISOString() : "",
			bgColor: task?.bgColor || "#6FA6F0",
		},
	});
	const onsubmit = (data: z.infer<typeof formSchema>) => {
		if (!task) data.id = uuidv4();
		setTask(data);
		onOpenChange(false);
		form.reset();
		onClose?.();
		toast.success(`Task ${task ? "updated" : "added"} successfully!`);
	};
	const setTask = useTask((state) => state.setTask);

	useEffect(() => {
		if (task) {
			form.reset({
				id: task.id,
				name: task.name,
				description: task.description,
				status: task.status,
				priority: task.priority,
				dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : "",
				bgColor: task.bgColor,
			});
		} else {
			form.reset({
				id: uuidv4(),
				name: "",
				description: "",
				status: "todo",
				priority: "low",
				dueDate: "",
				bgColor: "#6FA6F0",
			});
		}
	}, [task]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogPortal>
				<DialogOverlay className='backdrop-blur-xs' />
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{task ? "Edit Task" : "Add Task"}</DialogTitle>
						<DialogDescription>
							{task ? `Editing ${task.name}` : "Adding a new task to the list"}
						</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onsubmit)}
							className='flex flex-col gap-4'>
							{/* Name */}
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder='Name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* description */}
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input placeholder='Description' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Due Date */}
							<FormField
								control={form.control}
								name='dueDate'
								render={({ field }) => (
									<FormItem className='w-full flex flex-col gap-2'>
										<FormLabel>Due Date</FormLabel>
										<FormControl>
											<DatePicker disabled fieldValidation={field} />
										</FormControl>
										<FormMessage className='text-destructive text-xs font-semibold' />
									</FormItem>
								)}
							/>
							<div className='flex items-center gap-4 flex-wrap mt-3'>
								{/* Status */}
								<FormField
									control={form.control}
									name='status'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Status</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger className='max-w-[180px]'>
														<SelectValue placeholder='Select a role' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Status</SelectLabel>
														<SelectItem value='todo'>To Do</SelectItem>
														<SelectItem value='in-progress'>
															In Progress
														</SelectItem>
														<SelectItem value='done'>Done</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Priority */}
								<FormField
									control={form.control}
									name='priority'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Priority</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}>
												<FormControl>
													<SelectTrigger className='max-w-[180px]'>
														<SelectValue placeholder='Select a status' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Priorities</SelectLabel>
														<SelectItem value='high'>High</SelectItem>
														<SelectItem value='medium'>Medium</SelectItem>
														<SelectItem value='low'>Low</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Background Color Field */}
								<FormField
									control={form.control}
									name='bgColor'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Background Color</FormLabel>
											<FormControl className='ring-1 ring-transparent focus-visible:ring-axon-blue focus-visible:ring-2 border-none py-2 rounded-lg w-full font-medium'>
												<ColorPicker
													value={field.value || "#6FA6F0"}
													onChange={field.onChange}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button variant='primary' type='submit'>
								{task ? "Update Task" : "Add Task"}
							</Button>
						</form>
					</Form>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	);
};

export default TaskDialog;
