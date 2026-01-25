export const createDateInCurrentMonth = (
	day: number,
	hour: number,
	minute: number = 0,
) => {
	const date = new Date();
	date.setDate(day);
	date.setHours(hour, minute, 0, 0);
	return date.toISOString();
};
