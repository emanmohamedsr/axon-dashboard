import type { TeamMember } from "@/features/team/types/team-member";

export const getMembersStatus = (data: TeamMember[]) => {
	const statusCount: Record<string, number> = {};
	data.forEach((member) => {
		if (statusCount[member.status]) statusCount[member.status] += 1;
		else statusCount[member.status] = 1;
	});
	return [
		...Object.entries(statusCount).map(([status, count]) => ({
			status,
			count,
		})),
	];
};

export const totalActiveMembers = (data: TeamMember[]) => {
	let activeMembers = 0;
	data.forEach((member) => {
		if (member.status === "Active") {
			activeMembers += 1;
		}
	});
	return activeMembers;
};

export const highestStatusIndex = (data: { count: number }[]) => {
	let highestIndex = 0,
		highestValue = 0;
	data.forEach((item, index) => {
		if (item.count > highestValue) {
			highestValue = item.count;
			highestIndex = index;
		}
	});
	return highestIndex;
};
