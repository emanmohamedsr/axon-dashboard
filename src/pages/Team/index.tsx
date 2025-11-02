import { DataTable } from "@/pages/Team/components/data-table";
import { type team } from "@/pages/Team/data";
import { columns } from "./components/columns";
import useTeam from "@/shared/hooks/team";
import TeamDialog from "./components/TeamDialog";
import { Button } from "@/components/ui/button";

const TeamPage = () => {
	const teamData = useTeam((state) => state.team);
	return (
		<div className='w-full h-full flex flex-col gap-4 justify-center items-center p-4'>
			<TeamDialog>
				<Button className='mr-auto' variant={"primary"}>
					Add team member
				</Button>
			</TeamDialog>
			<DataTable<team, any> columns={columns} data={teamData} />
		</div>
	);
};

export default TeamPage;
