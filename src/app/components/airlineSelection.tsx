"use client"

import useSWR from "swr";
import { useState } from "react";
import { FormControl, FormHelperText, FormLabel, Select } from "@chakra-ui/react";
import { AirlineUi, AirportBasicDataUi } from "../types/uiTypes";
import { AirlineApi, ApiResponse } from "../types/apiTypes";

//@ts-expect-error Example taken straigh from docs
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

const generateOptions = (airlines?: AirlineUi[]): JSX.Element[] => {
  if (!airlines || airlines.length === 0) {
    return ([<option key="no-flights">No flights from the airport</option>]);
  }

  const options = []
  options.push(<option key="select">Select airline</option>);

  airlines.forEach((x) =>
    options.push(
      <option key={x.icao} value={x.name}>
        {x.name}
      </option>
    )
  );

  return options;
}

export default function AirlineSelection({
  params,
}: {
  params: {
    selectedAirport: AirportBasicDataUi | null;
    selectedAirline: AirlineUi | null;
    setSelectedAirline: (val: AirlineUi | null) => void;
  };
  }) {
  
  const [selectValue, setSelectValue] = useState<string>("")
  
  const { data, error, isLoading } = useSWR<ApiResponse<AirlineApi[]>, Error>(
    params.selectedAirport
      ? `/api/airport/${params.selectedAirport?.icao}/airline`
      : null,
    fetcher);
  
  const validateEntry = (entry: string): void => {
    setSelectValue(entry);

    if (data && data.results) {
      // Find the correct airline value from data with name

      const found = data.results.filter((x) => x.name === entry);

      if (found.length === 1) {
        return params.setSelectedAirline(found[0]);
      }
    }

    params.setSelectedAirline(null);
  }
  
  return (
    <FormControl textAlign={"left"} pt={4} pb={4}>
      <FormLabel>Airlines</FormLabel>
      <Select
        disabled={!params.selectedAirport || isLoading}
        value={selectValue}
        onChange={(e) => validateEntry(e.target.value)}
      >
        {generateOptions(data?.results)}
      </Select>
      <FormHelperText>
        Airlines that have flights from the airport
      </FormHelperText>
    </FormControl>
  );
}