import TeamStatus from "../charts/TeamStatus";
import TimeZoneDistribution from "../charts/TimeZoneDistribution";
import MapMainView from "./MapMainView";

const MapView = () => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-3 h-full'>
			<div className='col-span-2'>
				<MapMainView />
			</div>
			<div className='col-span-1 flex lg:flex-col gap-3 sm:flex-row flex-col'>
				<div className='flex-1 flex justify-center items-center'>
					<TeamStatus />
				</div>
				<div className='flex-1 flex justify-center items-center'>
					<TimeZoneDistribution />
				</div>
			</div>
		</div>
	);
};

export default MapView;
