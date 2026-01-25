export const daysFromNow = (days: number) =>
	new Date(new Date().setDate(new Date().getDate() + days));
export const pastDate = (days: number) =>
	new Date(new Date().setDate(new Date().getDate() - days));
