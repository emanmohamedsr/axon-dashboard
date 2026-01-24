import { Button } from "@/components/ui/button";
import TeamStatus from "@/features/cennectionsMap/charts/TeamStatus";
import TimeZoneDistribution from "@/features/cennectionsMap/charts/TimeZoneDistribution";
import { TeamTable } from "@/features/team/components";
import TeamDialog from "@/features/team/components/TeamDialog";

const TeamPage = () => {
	return (
		<div>
			<div className='p-2'>
				<TeamDialog>
					<Button className='mr-auto' variant={"primary"}>
						Add team member
					</Button>
				</TeamDialog>
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-3 p-2 bg-muted/10 min-h-screen items-center'>
				<div className='col-span-1 lg:col-span-3'>
					<TeamTable />
				</div>
				<div className='col-span-3 flex flex-col sm:flex-row gap-3'>
					<div className='flex-1'>
						<TeamStatus />
					</div>
					<div className='flex-1'>
						<TimeZoneDistribution />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeamPage;
