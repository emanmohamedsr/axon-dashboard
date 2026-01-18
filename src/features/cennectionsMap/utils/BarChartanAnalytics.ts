import type { TeamMember } from "@/features/team/types/team-member";

// **
//  funtion to get members count by region
//  like a frequancy array by a record object
// **

export default function getMembersByRegion(teamMembers: TeamMember[]) {
	const membersByRegion: Record<string, number> = {};
	teamMembers.forEach((member) => {
		const region = member.location?.displayName.split(", ")[1] || "Unknown";
		if (membersByRegion[region]) membersByRegion[region] += 1;
		else membersByRegion[region] = 1;
	});
	return [...Object.entries(membersByRegion)].map(([region, count]) => ({
		region,
		members: count,
	}));
}

export const totalMembers = (data: { members: number }[]) =>
	data.reduce((acc, curr) => acc + curr.members, 0);
