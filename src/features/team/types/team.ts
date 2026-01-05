export type team = {
	id: string;
	name: string;
	email: string;
	role: "Admin" | "Designer" | "Developer" | "Analyst";
	status: "Active" | "Inactive" | "Pending" | "Banned";
};
