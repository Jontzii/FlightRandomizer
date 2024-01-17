"use client";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { AirlineDataWithFlightsUi } from "@/app/types/uiTypes";
import { generateRandomString } from "@/app/utils/generateRandomString";

const compare = (a: AirlineDataWithFlightsUi, b: AirlineDataWithFlightsUi) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const generateOptions = (
  isLoading: boolean,
  airlines?: AirlineDataWithFlightsUi[],
): JSX.Element[] => {
  if (isLoading) {
    return [<option key="loading">Airlines loading...</option>];
  }

  if (!airlines || airlines.length === 0) {
    return [<option key="no-flights">No flights from the airport</option>];
  }

  const options = [];
  options.push(<option key="select">Select airline</option>);

  airlines.sort(compare).forEach((airline) =>
    options.push(
      <option key={`${airline.icao}-${generateRandomString(10)}`} value={airline.name}>
        {airline.name}
      </option>
    )
  );

  return options;
};

export default function AirlineSelection({
  params,
}: {
  params: {
    airlinesLoading: boolean;
    allAirlines: AirlineDataWithFlightsUi[] | undefined;
    selectedAirline: AirlineDataWithFlightsUi | null;
    setSelectedAirline: (val: AirlineDataWithFlightsUi | null) => void;
    selectedAirlineStr: string;
    setSelectedAirlineStr: (val: string) => void;
    resetAircraftAndResultTable: () => void
  };
}) {
  const validateEntry = (entry: string): void => {
    params.setSelectedAirlineStr(entry);
    params.resetAircraftAndResultTable();

    if (params.allAirlines) {
      // Find the correct airline value from data with name
      const found = params.allAirlines.find(
        (airline) => airline.name === entry
      );

      if (found) {
        return params.setSelectedAirline(found);
      }
    }

    params.setSelectedAirline(null);
  };

  return (
    <FormControl textAlign={"left"} pt={4} pb={4}>
      <FormLabel fontSize={{ base: "small", sm: "medium" }}>Airlines</FormLabel>
      <Select
        disabled={!params.allAirlines}
        value={params.selectedAirlineStr}
        onChange={(e) => validateEntry(e.target.value)}
      >
        {generateOptions(params.airlinesLoading, params.allAirlines)}
      </Select>
      <FormHelperText fontSize={{ base: "small", sm: "medium" }}>
        Airlines with flights in the selected time window
      </FormHelperText>
    </FormControl>
  );
}
