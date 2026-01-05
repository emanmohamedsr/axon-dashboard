import { Button } from "@/components/ui/button";
import { TeamTable } from "@/features/team/components";
import TeamDialog from "@/features/team/components/TeamDialog";

const TeamPage = () => {
	return (
		<div className='w-full h-full flex flex-col gap-4 justify-center items-center p-4'>
			<TeamDialog>
				<Button className='mr-auto' variant={"primary"}>
					Add team member
				</Button>
			</TeamDialog>
			<TeamTable />
		</div>
	);
};

export default TeamPage;
