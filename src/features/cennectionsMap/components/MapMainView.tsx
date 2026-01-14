import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { roleVariantMap, statusVariantMap } from "@/features/team/constants";
import useTeam from "@/features/team/hooks/useTeam";
import { images } from "@/shared/assets";
import LocalTimeClock from "@/shared/components/LocalTimeClock";
import "leaflet/dist/leaflet.css";
import { Mail, MapPin } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface MapMainViewProps {
	isWideView?: boolean;
}

const MapMainView = ({ isWideView = false }: MapMainViewProps) => {
	const teamMembers = useTeam().team;
	return (
		<MapContainer
			center={isWideView ? [30.58768, 31.502] : [51.505, -0.09]}
			zoom={isWideView ? 4 : 2}
			scrollWheelZoom={false}
			className={`h-[calc(100vh-90px)] w-full min-h-[500px] rounded-lg z-0 shadow-md`}>
			<TileLayer
				className='contrast-100 dark:contrast-75'
				url='https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}'
				attribution='Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
			/>

			{teamMembers &&
				teamMembers.map(
					(member) =>
						member.location && (
							<Marker
								key={member.id}
								position={[member.location.lat, member.location.lng]}>
								{!isWideView && (
									<Popup className='custom-popup-clean'>
										<div className='w-[220px] p-1'>
											<div className='flex items-start gap-3 mb-3'>
												<Avatar className='w-10 h-10 border-2 border-white shadow-sm'>
													<AvatarImage
														src={member.avatarUrl || images.fallbackAvatarImage}
													/>
													<AvatarFallback>
														{member.name.substring(0, 2).toUpperCase()}
													</AvatarFallback>
												</Avatar>

												<div className='flex flex-col'>
													<h3 className='font-bold text-sm text-gray-900 leading-none'>
														{member.name}
													</h3>
													<p
														className={`text-[10px] px-2 h-5 ${
															statusVariantMap[member.status]
														}`}>
														{member.status}
													</p>
												</div>
											</div>

											<div className='space-y-3 mb-3'>
												<div className='flex items-center justify-between'>
													<Badge variant={roleVariantMap[member.role]}>
														{member.role}
													</Badge>
													<div className='flex items-center text-[10px] text-gray-500 gap-1'>
														<MapPin className='w-3 h-3 text-sky-700' />
														{member.location?.displayName.split(",")[0]}
													</div>
												</div>

												<LocalTimeClock timeZone={member.location.timeZone} />
											</div>

											<div className='grid grid-cols-1'>
												<Button size='sm' variant='outline' className='w-full'>
													<a
														href={`mailto:${member.email}`}
														className='h-7 text-xs w-full gap-2 flex justify-center items-center'>
														<Mail className='w-3 h-3' />
														Email {member.name.split(" ")[0]}
													</a>
												</Button>
											</div>
										</div>
									</Popup>
								)}
							</Marker>
						),
				)}
		</MapContainer>
	);
};

export default MapMainView;
