import teamData from "../data";
import { type team } from "../types/team";
import { create } from "zustand";

interface teamState {
	team: team[];
	setTeamMember: (member: team) => void;
	deleteTeamMember: (id: string) => void;
}

const useTeam = create<teamState>((set) => ({
	team: teamData,
	setTeamMember: (member: team) =>
		set((state) => {
			const isExisting = state.team.findIndex((t) => t.id === member.id);
			if (isExisting === -1) {
				return { team: [member, ...state.team] };
			} else {
				const updatedteam = state.team.map((t) =>
					t.id === member.id ? member : t,
				);
				return { team: updatedteam };
			}
		}),
	deleteTeamMember: (id: string) =>
		set((state) => ({
			team: state.team.filter((t) => t.id !== id),
		})),
}));
export default useTeam;
