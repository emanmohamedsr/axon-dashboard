import DataTable from "@/shared/components/ui/data-table";
import columns from "./columns";
import type { team } from "../types/team";
import useTeam from "../hooks/useTeam";

const TeamTable = () => {
	const teamData = useTeam((state) => state.team);
	return <DataTable<team, any> columns={columns} data={teamData} />;
};

export default TeamTable;
