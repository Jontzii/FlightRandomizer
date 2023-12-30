"use client";

import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import useSWR from "swr";

import { AirlineUi, AirportBasicDataUi, FlightUi } from "./types/uiTypes";
import { ApiResponse, FlightApi } from "./types/apiTypes";

import AirportSelection from "./components/airportSelection";
import AirlineSelection from "./components/airlineSelection";
import ResultComponent from "./components/resultTable";
import BottomLinks from "./components/bottomLinks";
import IconButtons from "./components/iconButtons";
import useUserDefinedLimits from "./hooks/useUserDefinedLimits";
import { generateQueryParams } from "./utils/generateQueryParams";

//@ts-expect-error Example taken straigh from docs
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [selectedAirport, setSelectedAirport] =
    useState<AirportBasicDataUi | null>(null);
  const [selectedAirline, setSelectedAirline] = useState<AirlineUi | null>(
    null
  );
  const [selectedFlight, setSelectedFlight] = useState<FlightUi | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [userLimits, setUserLimits] = useUserDefinedLimits();

  const handleRandomizeClick = () => {
    const randomizedFlight = data
      ? data?.results[Math.floor(Math.random() * data?.results.length)]
      : null;

    if (!randomizedFlight) {
      setSelectedFlight(null);
      setShowResult(false);
      return;
    }

    const flightData: FlightUi = {
      airline: randomizedFlight.airline,
      aircraft: randomizedFlight.aircraft,
      flightNumber: randomizedFlight.flightNumber,
      departureIcao: randomizedFlight.departureIcao,
      departureTime: randomizedFlight.departureTime,
      departureName: selectedAirport?.name,
      arrivalIcao: randomizedFlight.arrivalIcao,
      arrivalName: randomizedFlight.arrivalName,
      arrivalTime: randomizedFlight.arrivalTime,
    };

    setSelectedFlight(flightData);
    setShowResult(true);
  };

  const resetResultTable = () => {
    setShowResult(false);
    setSelectedFlight(null);
  };

  const { data, error, isLoading } = useSWR<ApiResponse<FlightApi[]>, Error>(
    selectedAirport && selectedAirline
      ? `/api/airport/${selectedAirport?.icao}/airline/${selectedAirline?.icao}/flight${generateQueryParams(userLimits)}`
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
            selectedAirport,
            selectedAirline,
            setSelectedAirline,
            userLimits,
            setUserLimits,
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
