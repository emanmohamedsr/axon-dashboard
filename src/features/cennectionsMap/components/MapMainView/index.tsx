import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { roleVariantMap, statusVariantMap } from "@/features/team/constants";
import useTeam from "@/features/team/hooks/useTeam";
import { images } from "@/shared/assets";
import LocalTimeClock from "@/shared/components/LocalTimeClock";
import "leaflet/dist/leaflet.css";
import { Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import {
	MapContainer,
	Marker,
	Polyline,
	Popup,
	TileLayer,
} from "react-leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

import "./index.css";
import getCurvedPath from "../../utils/curved-path";
import { Card } from "@/components/ui/card";
interface MapMainViewProps {
	isWideView?: boolean;
}

const HQ_POSITION: [number, number] = [30.0444, 31.2357];

const MapMainView = ({ isWideView = false }: MapMainViewProps) => {
	const teamMembers = useTeam().team;
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		delete (L.Icon.Default.prototype as any)._getIconUrl;
		setMounted(true);
		L.Icon.Default.mergeOptions({
			iconUrl: markerIcon,
			iconRetinaUrl: markerIcon2x,
			shadowUrl: markerShadow,
		});
	}, []);

	const lineOptions = {
		color: "#7FB0F5",
		weight: 2,
		opacity: 0.8,
		dashArray: "5, 10",
		lineCap: "round" as const,
	};

	if (!mounted)
		return <div className='h-full w-full bg-muted animate-pulse rounded-xl' />;
	return (
		<Card className='h-full w-full p-2'>
			<MapContainer
				center={isWideView ? [30.58768, 31.502] : HQ_POSITION}
				zoom={isWideView ? 3 : 2.5}
				scrollWheelZoom={false}
				className={`h-full w-full min-h-[500px] rounded-lg z-0 shadow-md`}>
				<TileLayer
					className='contrast-100 dark:invert'
					url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
				/>

				{teamMembers &&
					teamMembers.map((member) => {
						const isHQ =
							member.location?.lat === HQ_POSITION[0] &&
							member.location?.lng === HQ_POSITION[1];
						const curvePoints = getCurvedPath(HQ_POSITION, [
							member.location?.lat || 0,
							member.location?.lng || 0,
						]);
						return (
							!isHQ &&
							member.location && (
								<Polyline
									key={member.id}
									pathOptions={lineOptions}
									positions={curvePoints}
								/>
							)
						);
					})}

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
															src={
																member.avatarUrl || images.fallbackAvatarImage
															}
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
													<Button
														size='sm'
														variant='outline'
														className='w-full'>
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
		</Card>
	);
};

export default MapMainView;
