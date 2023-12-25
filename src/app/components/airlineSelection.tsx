import { FormControl, FormHelperText, FormLabel, Select } from "@chakra-ui/react";
import { AirportBasicData } from "../types/airportTypes";
import { Airline } from "../types/airlineTypes";
import useSWR from "swr";
import { ApiResponse } from "../types/apiResponse";

//@ts-expect-error Example taken straigh from docs
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export default function AirlineSelection({
  params,
}: {
  params: {
    selectedAirport: AirportBasicData | null;
    selectedAirline: Airline | null;
    setSelectedAirline: (val: Airline | null) => void;
  };
  }) {
  
  const { data, error, isLoading } = useSWR<ApiResponse<Airline[]>, Error>(
    params.selectedAirport != null
      ? `/api/airport/${params.selectedAirport?.icao}/airline`
      : null,
    fetcher);
  
  return (
    <FormControl textAlign={"left"} pt={4} pb={4}>
      <FormLabel>Airlines</FormLabel>
      <Select disabled={!params.selectedAirport || isLoading}>
        {data?.results.map((x) => (
          (<option key={x.icao}>{ x.name }</option>)
        ))}
      </Select>
      <FormHelperText>
        Airlines that have flights from the airport
      </FormHelperText>
    </FormControl>
  );
}