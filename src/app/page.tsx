"use client"

import {
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";

import { AirportBasicData } from "./types/airportTypes";
import { Airline, Flight } from "./types/airlineTypes";
import { ApiResponse } from "./types/apiResponse";

import AirportSelection from "./components/airportSelection";
import AirlineSelection from "./components/airlineSelection";
import ResultComponent from "./components/resultTable";
import DarkmodeButton from "./components/darkmodeButton";
import BottomLinks from "./components/bottomLinks";

//@ts-expect-error Example taken straigh from docs
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [selectedAirport, setSelectedAirport] = useState<AirportBasicData | null>(null);
  const [selectedAirline, setSelectedAirline] = useState<Airline | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleRandomizeClick = () => {
    const randomizedFlight = data
      ? data?.results[Math.floor(Math.random() * data?.results.length)]
      : null;
    
    if (!randomizedFlight) {
      setSelectedFlight(null);
      setShowResult(false);
      return;
    }
    
    randomizedFlight.departureName = selectedAirport?.name;
    setSelectedFlight(randomizedFlight);
    setShowResult(true);
  }

  const resetResultTable = () => {
    setShowResult(false);
    setSelectedFlight(null);
  }

  const { data, error, isLoading } = useSWR<ApiResponse<Flight[]>, Error>(
    selectedAirport && selectedAirline
      ? `/api/airport/${selectedAirport?.icao}/airline/${selectedAirline?.icao}/flight`
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
          params={{ selectedAirport, selectedAirline, setSelectedAirline }}
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

      <DarkmodeButton />
      <BottomLinks />
    </>
  );
}
