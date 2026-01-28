import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { images } from "@/shared/assets";
import ColorPicker from "@/shared/components/ui/ColorPicker";
import DatePicker from "@/shared/components/ui/DatePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDeleteEventDialogStore } from "../../hooks/useDeleteEventDialog";
import {
	type EventFormValues,
	formSchema,
} from "../../schemas/eventFormSchema";
import type { CalendarEvent } from "../../types";

interface CalendarFormProps {
	selectedEvent: CalendarEvent | null;
	selectedDateRange: {
		start: string | Date;
		end: string | Date;
	} | null;
	isModalOpen: boolean;
	onSubmitEvent: (data: CalendarEvent) => void;
}

const EventForm = ({
	selectedEvent,
	selectedDateRange,
	isModalOpen,
	onSubmitEvent,
}: CalendarFormProps) => {
	const setDeleteDialog = useDeleteEventDialogStore().setOpen;

	// --- FORM Definition ---
	const form = useForm<EventFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			start: "",
			end: "",
			allDay: false,
			status: "pending",
			backgroundColor: "#6FA6F0",
			borderColor: "#fff",
		},
	});

	// --- FORM Submit Handler ---
	const onSubmit = (data: EventFormValues) => {
		let finalStart = data.start;
		let finalEnd = data.end;
		if (data.allDay) {
			finalStart = finalStart.split("T")[0];
			finalEnd = finalEnd.split("T")[0];
		}
		onSubmitEvent({
			...data,
			start: finalStart,
			end: finalEnd,
		} as CalendarEvent);
	};

	useEffect(() => {
		if (isModalOpen) {
			if (selectedEvent) {
				// --- EDIT MODE ---
				form.reset({
					title: selectedEvent.title,
					description: selectedEvent.description || "",
					start: new Date(selectedEvent.start).toISOString(),
					end: new Date(selectedEvent.end).toISOString(),
					allDay: selectedEvent.allDay || false,
					status: selectedEvent.status || "pending",
					backgroundColor: selectedEvent.backgroundColor || "#6FA6F0",
					borderColor: selectedEvent.borderColor || "#fff",
				});
			} else if (selectedDateRange) {
				// --- ADD MODE (With Date Selected) ---
				const startDate = new Date(selectedDateRange.start);
				startDate.setHours(9, 0, 0);
				const endDate = new Date(selectedDateRange.end);
				if (startDate.getDate() === endDate.getDate())
					endDate.setHours(10, 0, 0);
				else endDate.setHours(9, 0, 0);
				form.reset({
					title: "",
					description: "",
					start: startDate.toISOString(),
					end: endDate.toISOString(),
					allDay: false,
					status: "pending",
					backgroundColor: "#6FA6F0",
					borderColor: "#fff",
				});
			} else {
				// --- ADD MODE (Manual Button Click) ---
				form.reset({
					title: "",
					description: "",
					start: "",
					end: "",
					allDay: false,
					status: "pending",
					backgroundColor: "#6FA6F0",
					borderColor: "#fff",
				});
			}
		}
	}, [isModalOpen, selectedEvent, selectedDateRange, form]);

	const isAllDay = form.watch("allDay");
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-9 mt-1'>
				{/* Title */}
				<FormField
					control={form.control}
					name='title'
					render={({ field, fieldState }) => (
						<FormItem>
							<FormControl
								className={`focus-visible:ring-axon-blue focus-visible:ring-2 border-none py-2 rounded-lg w-full font-medium ${
									fieldState.invalid ?
										"ring-1 ring-destructive"
									:	"ring-1 ring-transparent"
								}`}>
								<InputGroup>
									<InputGroupInput placeholder='Name' {...field} />
									<InputGroupAddon align='inline-start'>
										<img src={images.star} alt='star' />
									</InputGroupAddon>
								</InputGroup>
							</FormControl>
							<FormMessage className='text-destructive text-xs font-semibold' />
						</FormItem>
					)}
				/>
				{/* allDay */}
				<FormField
					control={form.control}
					name='allDay'
					render={({ field }) => (
						<FormItem className='ring-1 ring-transparent focus-visible:ring-axon-blue focus-visible:ring-2 border-none py-2 px-4 rounded-lg w-full flex items-center justify-between font-medium'>
							<p>Spans all day</p>
							<FormControl>
								<Switch
									className='data-[state=checked]:bg-axon-blue data-[state=unchecked]:bg-[#64748B]'
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* start date */}
				<FormField
					control={form.control}
					name='start'
					render={({ field, fieldState }) => (
						<FormItem>
							<FormControl>
								<DatePicker
									disabled={isAllDay}
									fieldValidation={field}
									isRequired
									isInvalid={fieldState.invalid}
								/>
							</FormControl>
							<FormMessage className='text-destructive text-xs font-semibold' />
						</FormItem>
					)}
				/>
				{/* end date */}
				<FormField
					control={form.control}
					name='end'
					render={({ field, fieldState }) => (
						<FormItem>
							<FormControl>
								<DatePicker
									disabled={isAllDay}
									fieldValidation={field}
									isRequired
									isInvalid={fieldState.invalid}
								/>
							</FormControl>
							<FormMessage className='text-destructive text-xs font-semibold' />
						</FormItem>
					)}
				/>
				{/* Background Color Field */}
				<FormField
					control={form.control}
					name='backgroundColor'
					render={({ field }) => (
						<FormItem>
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
				{/* Description */}
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder='Description'
									className='ring-1 ring-transparent focus-visible:ring-axon-blue focus-visible:ring-2 border-none py-2 rounded-lg w-full font-medium'
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				{/* Done */}
				{selectedEvent && (
					<FormField
						control={form.control}
						name='status'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className='flex items-center gap-3'>
										<Label
											htmlFor='status'
											className='font-semibold text-md text-axon-blue'>
											Status
										</Label>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant='outline'>
													{field.value || "Select status"}
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className='w-56'>
												<DropdownMenuLabel>Status Panel</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<DropdownMenuRadioGroup
													value={field.value}
													onValueChange={field.onChange}>
													<DropdownMenuRadioItem value='done'>
														Done
													</DropdownMenuRadioItem>
													<DropdownMenuRadioItem value='inprogress'>
														In Progress
													</DropdownMenuRadioItem>
													<DropdownMenuRadioItem value='pending'>
														Pending
													</DropdownMenuRadioItem>
												</DropdownMenuRadioGroup>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<div className='flex justify-between gap-4'>
					<Button
						type='submit'
						className='bg-axon-gradient cursor-pointer text-axon-text-color hover:opacity-80 px-5 py-[25px] rounded-xl font-semibold text-lg shadow-md transition-colors flex-1'>
						{selectedEvent ? "Edit event" : "Add event"}
					</Button>
					{selectedEvent && (
						<Button
							type='button'
							onClick={() => setDeleteDialog(true)}
							variant={"ghost"}
							className='cursor-pointer w-[50px] h-[50px] hover:bg-[#ffc8c8] rounded-xl flex items-center justify-center'>
							<Trash2 className='w-full h-full text-destructive' />
						</Button>
					)}
				</div>
			</form>
		</Form>
	);
};

export default EventForm;
