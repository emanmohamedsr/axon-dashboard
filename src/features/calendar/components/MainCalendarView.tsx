import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { EventForm } from "@/features/calendar/components";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import "../Styles/fullcalendar.css";
import { images } from "../assets";
import { useCalendarController } from "../hooks/useCalendarController";
import FullCalendarComponent from "./NativeCalendarView";

const VIEW_TYPES = [
	{ label: "Month", value: "dayGridMonth" },
	{ label: "Week", value: "timeGridWeek" },
	{ label: "Day", value: "timeGridDay" },
];

const MainCalendarView = () => {
	const {
		currentView,
		dateTitle,
		isModalOpen,
		selectedEvent,
		selectedDateRange,
		setIsModalOpen,
		handleViewChange,
		handlePrev,
		handleNext,
		handleEventSubmit,
		handleEventDelete,
	} = useCalendarController();

	return (
		<div className='flex-1 flex flex-col gap-6 h-full w-full p-6 relative max-w-[720px]'>
			<div className='flex w-fit bg-axon-lighter-blue dark:bg-axon-dark-gray items-center sm:space-x-[15px] rounded-xl'>
				{renderViewSwitcher(currentView, handleViewChange)}
			</div>

			<div className='flex flex-col-reverse gap-4 sm:flex-row justify-center items-start sm:items-center sm:justify-between '>
				<div className='flex items-center gap-4 justify-between sm:justify-start'>
					<h2 className='text-axon-text-color font-bold text-sm sm:text-xl'>
						{dateTitle}
					</h2>
					<div className='flex items-center gap-2'>
						<button
							onClick={handlePrev}
							className='cursor-pointer p-1 text-axon-text-color hover:bg-axon-lighter-blue dark:hover:bg-axon-dark-gray rounded-lg transition-colors'>
							<ChevronLeft className='w-6 h-6' />
						</button>
						<button
							onClick={handleNext}
							className='cursor-pointer p-1 text-axon-text-color hover:bg-axon-lighter-blue dark:hover:bg-axon-dark-gray rounded-lg transition-colors'>
							<ChevronRight className='w-6 h-6' />
						</button>
					</div>
				</div>

				<button
					onClick={() => setIsModalOpen(true)}
					className='text-sm sm:text-lg cursor-pointer text-axon-text-color flex items-center gap-2 bg-axon-gradient px-2.5 py-1.25 sm:px-5 sm:py-2.5 rounded-xl font-semibold shadow-md transition-colors'>
					Add new <Plus className='w-5 h-5 text-axon-text-color' />
				</button>
			</div>

			<div className='flex-1  rounded-3xl rounded-bl-none shadow-xl border  overflow-hidden flex flex-col'>
				<div className='flex-1 w-full overflow-x-auto overflow-y-auto'>
					<div className='min-w-[400px] max-h-[620px]'>
						<FullCalendarComponent />
					</div>
				</div>
			</div>

			{/* DIALOG FORMS WILL GO HERE */}
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className='sm:max-w-[425px] max-h-[90vh] overflow-y-auto'>
					<DialogHeader>
						<DialogTitle className='text-axon-blue text-center font-bold text-xl'>
							{selectedEvent ? "Edit Event" : "Add new Event"}
						</DialogTitle>
					</DialogHeader>

					<DialogDescription className='flex items-center gap-1 text-[#F61212] text-sm font-medium mt-2'>
						<img src={images.star} alt='star' />
						Required fields
					</DialogDescription>

					<EventForm
						selectedEvent={selectedEvent}
						selectedDateRange={selectedDateRange}
						isModalOpen={isModalOpen}
						onSubmitEvent={handleEventSubmit}
						onDeleteEvent={handleEventDelete}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};

const renderViewSwitcher = (
	currentView: string,
	handleViewChange: (v: string) => void,
) => {
	return VIEW_TYPES.map((view) => (
		<button
			key={view.value}
			onClick={() => handleViewChange(view.value)}
			className={`sm:w-20 p-2 cursor-pointer font-bold text-sm sm:leading-6 rounded-xl transition-all ${
				currentView === view.value
					? "bg-axon-gradient shadow-sm"
					: "bg-axon-lighter-blue dark:bg-axon-dark-gray hover:opacity-80"
			}`}>
			{view.label}
		</button>
	));
};

export default MainCalendarView;
