import { useQuery } from "@tanstack/react-query";
import nominatimClient from "../config/axios-instance";
import { useState } from "react";
import { useDebounce } from "@/shared/hooks/use-debounce";

export interface NominatinResponse {
	place_id: number;
	display_name: string;
	lat: string;
	lon: string;
}

const useLocationsSearch = () => {
	const [searchText, setSearchText] = useState<string>("");

	const STALE_TIME_5_MINUTES = 1000 * 60 * 5;

	const debouncedSearchText = useDebounce<string>(searchText, 500);

	const {
		data: suggestions = [],
		isLoading,
		isError,
	} = useQuery<NominatinResponse[]>({
		queryKey: ["locations", debouncedSearchText],
		queryFn: async () => {
			const response = await nominatimClient.get("/search", {
				params: {
					q: searchText,
					format: "json",
					limit: 5,
					email: "emanmohamedsr72@gmail.com",
					"accept-language": "en",
				},
			});
			return response.data;
		},
		enabled: debouncedSearchText.length > 3,
		placeholderData: (previousData) => previousData,
		staleTime: STALE_TIME_5_MINUTES,
	});

	return {
		searchText,
		setSearchText,
		isLoading,
		isError,
		suggestions,
	};
};
export default useLocationsSearch;
