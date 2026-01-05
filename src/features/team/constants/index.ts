import type { team } from "../types/team";

export const roleVariantMap: Record<
	team["role"],
	"primary" | "default" | "secondary" | "destructive" | "outline"
> = {
	Admin: "destructive",
	Developer: "secondary",
	Designer: "outline",
	Analyst: "default",
};

export const statusVariantMap: Record<team["status"], string> = {
	Active: "text-green-600 dark:text-green-400",
	Inactive: "text-red-600 dark:text-red-400",
	Pending: "text-yellow-600 dark:text-yellow-400",
	Banned: "text-gray-600 dark:text-gray-400",
};
