import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface LocalTimeClockProps {
	timeZone: string;
}
const LocalTimeClock = ({ timeZone }: LocalTimeClockProps) => {
	const [localTime, setLocalTime] = useState("");
	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const formatted = Intl.DateTimeFormat("en-US", {
				timeZone: timeZone || "UTC",
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			}).format(now);
			setLocalTime(formatted);
		};
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, [timeZone]);
	if (!timeZone) return null;

	return (
		<div className='flex items-center gap-1.5 text-[12px] p-2 font-bold text-gray-600 w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-2 py-1 rounded-md mt-2'>
			<Clock className='w-3 h-3 text-sky-700' />
			<span className='font-medium'>Time: {localTime}</span>
		</div>
	);
};

export default LocalTimeClock;
