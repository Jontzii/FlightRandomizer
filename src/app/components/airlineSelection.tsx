"use client"

import { useState } from "react";
import { FormControl, FormHelperText, FormLabel, Select } from "@chakra-ui/react";
import { AirlineDataWithFlightsUi} from "@/app/types/uiTypes";
import { AirlineAirportDataWithFlightsApi, ApiResponse } from "@/app/types/apiTypes";

const generateOptions = (
  airlines?: AirlineDataWithFlightsUi[]
): JSX.Element[] => {
  if (!airlines || airlines.length === 0) {
    return [<option key="no-flights">No flights from the airport</option>];
  }

  const options = [];
  options.push(<option key="select">Select airline</option>);

  airlines.forEach((airline) =>
    options.push(
      <option key={airline.icao} value={airline.name}>
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
    allAirlines: AirlineDataWithFlightsUi[] | undefined;
    selectedAirline: AirlineDataWithFlightsUi | null;
    setSelectedAirline: (val: AirlineDataWithFlightsUi | null) => void;
  };
}) {
  const [selectValue, setSelectValue] = useState<string>("");

  const validateEntry = (entry: string): void => {
    setSelectValue(entry);

    if (params.allAirlines) {
      // Find the correct airline value from data with name

      const found = params.allAirlines.filter((airline) => airline.name === entry);

      if (found.length === 1) {
        return params.setSelectedAirline(found[0]);
      }
    }

    params.setSelectedAirline(null);
  };

  return (
    <FormControl textAlign={"left"} pt={4} pb={4}>
      <FormLabel>Airlines</FormLabel>
      <Select
        disabled={!params.allAirlines}
        value={selectValue}
        onChange={(e) => validateEntry(e.target.value)}
      >
        {generateOptions(params.allAirlines)}
      </Select>
      <FormHelperText>
        Airlines that have flights from the airport
      </FormHelperText>
    </FormControl>
  );
}