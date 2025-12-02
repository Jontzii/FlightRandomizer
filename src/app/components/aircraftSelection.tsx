'use client';

import { FormControl, FormHelperText, FormLabel, Select } from '@chakra-ui/react';
import { AirlineDataWithFlightsUi } from '@/app/types/uiTypes';
import { generateRandomString } from '@/app/utils/generateRandomString';

const generateOptions = (isLoading: boolean, airline: AirlineDataWithFlightsUi | null): JSX.Element[] => {
  if (isLoading) {
    return [<option key="loading">Airlines loading...</option>];
  }

  if (!airline) {
    return [<option key="no-flights">No airline selected</option>];
  }

  const options = [];
  options.push(<option key="select">(Optional) Select airline</option>);

  const aircrafts: string[] = [];

  airline.departures.forEach((departure) => {
    if (aircrafts.indexOf(departure.aircraft) === -1) {
      aircrafts.push(departure.aircraft);
    }
  });

  aircrafts.sort().forEach((aircraft) =>
    options.push(
      <option key={`${aircraft}-${generateRandomString(10)}`} value={aircraft}>
        {aircraft}
      </option>,
    ),
  );

  return options;
};

export default function AircraftSelection({
  params,
}: {
  params: {
    airlinesLoading: boolean;
    selectedAirline: AirlineDataWithFlightsUi | null;
    selectedAircraft: string;
    setSelectedAircraft: (val: string) => void;
  };
}) {
  const validateEntry = (entry: string): void => {
    if (entry.includes('Select airline')) {
      params.setSelectedAircraft('');
    } else {
      params.setSelectedAircraft(entry);
    }
  };

  return (
    <FormControl textAlign={'left'} pt={4} pb={4}>
      <FormLabel fontSize={{ base: 'small', sm: 'medium' }}>Aircrafts</FormLabel>
      <Select
        disabled={!params.selectedAirline}
        value={params.selectedAircraft}
        onChange={(e) => validateEntry(e.target.value)}
      >
        {generateOptions(params.airlinesLoading, params.selectedAirline)}
      </Select>
      <FormHelperText fontSize={{ base: 'small', sm: 'medium' }}>
        Aircrafts that the airline operates from this airport
      </FormHelperText>
    </FormControl>
  );
}
