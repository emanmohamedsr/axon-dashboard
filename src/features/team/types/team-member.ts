import type { Location } from "@/shared/types/Location";

export type TeamMember = {
	id: string;
	name: string;
	email: string;
	role: "Admin" | "Designer" | "Developer" | "Analyst";
	status: "Active" | "Inactive" | "Pending" | "Banned";
	location?: Location;
};
