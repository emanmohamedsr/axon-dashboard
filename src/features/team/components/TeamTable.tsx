import type { TeamMember } from "../types/team-member";
import useTeam from "../hooks/useTeam";
import getColumns from "./columns";
import { DataTable } from "@/shared/components";
interface TeamTableProps {
	isWidgetMode?: boolean;
}

const TeamTable = ({ isWidgetMode = false }: TeamTableProps) => {
	const teamData = useTeam((state) => state.team);
	return (
		<DataTable<TeamMember, any>
			columns={getColumns(isWidgetMode)}
			data={teamData}
		/>
	);
};

export default TeamTable;
