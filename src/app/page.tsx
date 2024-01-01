"use client";

import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import useSWR from "swr";

import { AirlineDataWithFlightsUi, AirportBasicDataUi, FlightUi } from "@/app/types/uiTypes";
import { AirportDataWithFlightsApi, ApiResponse } from "@/app/types/apiTypes";

import AirportSelection from "@/app/components/airportSelection";
import AirlineSelection from "@/app/components/airlineSelection";
import ResultComponent from "@/app/components/resultTable";
import BottomLinks from "@/app/components/bottomLinks";
import IconButtons from "@/app/components/iconButtons";
import useUserDefinedLimits from "@/app/hooks/useUserDefinedLimits";

//@ts-expect-error Example taken straigh from docs
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export default function App() {
  const [selectedAirport, setSelectedAirport] =
    useState<AirportBasicDataUi | null>(null);
  const [selectedAirline, setSelectedAirline] =
    useState<AirlineDataWithFlightsUi | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<FlightUi | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [userLimits, setUserLimits] = useUserDefinedLimits();

  const handleRandomizeClick = () => {
    const departures = selectedAirline?.departures;
    const randomizedFlight = departures
      ? departures[Math.floor(Math.random() * departures.length)]
      : null;
    
    if (!randomizedFlight) {
      setSelectedFlight(null);
      setShowResult(false);
      return;
    }

    if (departures && departures.length > 1 && randomizedFlight == selectedFlight) {
      // If there is more than one flight and the new random flight 
      // is the same as previous, randomize again
      handleRandomizeClick();
      return;
    }

    setSelectedFlight(randomizedFlight);
    setShowResult(true);
  };

  const resetResultTable = () => {
    setShowResult(false);
    setSelectedFlight(null);
  };

  const { data, error, isLoading } = useSWR<ApiResponse<AirportDataWithFlightsApi>, Error>(
    selectedAirport
      ? `/api/airport/${selectedAirport?.icao}`
      : null,
    fetcher
  );

  return (
    <>
      <Box display={"flex"} flexDir={"column"}>
        <Text
          bgGradient="linear(to-l, #3300ff, #0084ff)"
          bgClip="text"
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="extrabold"
          justifyItems={"center"}
          textAlign={"center"}
          pt={4}
          pb={4}
        >
          Flight randomizer
        </Text>

        <Text fontSize={{ base: "xs", md: "sm" }} fontWeight={"bold"}>
          You can use this application to randomly select a flight from one
          airport with a specific airline.
        </Text>

        <AirportSelection
          params={{
            selectedAirport,
            setSelectedAirport,
            resetResultTable,
          }}
        />

        <AirlineSelection
          params={{
            allAirlines: data?.results.airlines,
            selectedAirline,
            setSelectedAirline
          }}
        />

        <Box>
          <Button
            isDisabled={selectedAirport == null || selectedAirline == null}
            onClick={handleRandomizeClick}
          >
            Randomize
          </Button>
        </Box>

        {showResult && selectedAirport && selectedAirline && selectedFlight ? (
          <ResultComponent params={{ selectedFlight }} />
        ) : null}
      </Box>

      <IconButtons params={{ userLimits, setUserLimits }} />
      <BottomLinks />
    </>
  );
}
