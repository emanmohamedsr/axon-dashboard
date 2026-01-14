import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import useLocationsSearch, {
	type NominatinResponse,
} from "./hooks/use-locations-search";
import { Spinner } from "@/components/ui/spinner";
import type { Location } from "@/shared/types/Location";

interface LocationInputProps {
	selectedLocation?: Location;
	setSelectedLocation: (l: Location) => void;
}

const LocationInput = ({
	selectedLocation,
	setSelectedLocation,
}: LocationInputProps) => {
	const [open, setOpen] = useState(false);
	const { searchText, setSearchText, suggestions, isError, isLoading } =
		useLocationsSearch();
	const handleSelect = (item: NominatinResponse) => {
		setOpen(false);
		setSearchText("");
		const userLocation: Location = {
			displayName: item.display_name,
			lat: parseFloat(item.lat),
			lng: parseFloat(item.lon),
		};
		setSelectedLocation(userLocation);
	};
	return (
		<Popover open={open} onOpenChange={setOpen} modal={true}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-[200px] justify-between'>
					{selectedLocation
						? selectedLocation.displayName
						: `Select Location...`}
					<ChevronsUpDown className='opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput
						placeholder={`Search Loactaion...`}
						className='h-9'
						value={searchText}
						onValueChange={setSearchText}
					/>
					<CommandList>
						{isLoading && (
							<div className='py-6 text-center text-sm text-muted-foreground flex justify-center items-center'>
								<Spinner className='mr-2 h-4 w-4 animate-spin' /> Loading...
							</div>
						)}
						{!isLoading &&
							suggestions.length === 0 &&
							searchText.length >= 3 && (
								<CommandEmpty>No location found.</CommandEmpty>
							)}
						{suggestions.length > 0 && !isLoading && !isError && (
							<CommandGroup>
								{suggestions.map((item) => (
									<CommandItem
										key={item.place_id}
										value={item.display_name}
										onSelect={() => handleSelect(item)}>
										{item.display_name}
										<Check
											className={cn(
												"ml-auto",
												selectedLocation?.displayName === item.display_name
													? "opacity-100"
													: "opacity-0",
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
export default LocationInput;
