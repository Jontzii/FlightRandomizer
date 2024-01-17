"use client";

import { useState } from "react";
import { Box, Button, Link, Text } from "@chakra-ui/react";

import {
  AirlineDataWithFlightsUi,
  AirportBasicDataUi,
  FlightUi,
} from "@/types/uiTypes";

import AirportSelection from "@/components/airportSelection";
import AirlineSelection from "@/components/airlineSelection";
import AircraftSelection from "@/components/aircraftSelection";
import ResultComponent from "@/components/resultTable";
import BottomLinks from "@/components/bottomLinks";
import IconButtons from "@/components/iconButtons";
import useUserDefinedLimits from "@/app/hooks/useUserDefinedLimits";
import useAirportDetails from "@/app/hooks/useAirportDetails";

export default function App() {
  const [selectedAirport, setSelectedAirport] =
    useState<AirportBasicDataUi | null>(null);
  const [selectedAirline, setSelectedAirline] =
    useState<AirlineDataWithFlightsUi | null>(null);
  const [selectedAircraft, setSelectedAircraft] = useState<string>("");
  
  // This is here due to an issue with Chakra select
  const [selectedAirlineStr, setSelectedAirlineStr] = useState<string>("");
  const [selectedFlight, setSelectedFlight] = useState<FlightUi | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [userLimits, setUserLimits] = useUserDefinedLimits();
  const [airportData, airportDataLoading] = useAirportDetails(
    userLimits,
    selectedAirport
  );

  const handleRandomizeClick = () => {
    let departures = selectedAirline?.departures;

    // Filter for correct aircraft
    if (departures && selectedAircraft !== "") {
      departures = departures?.filter((dep) => dep.aircraft === selectedAircraft)
    }

    const randomizedFlight = departures
      ? departures[Math.floor(Math.random() * departures.length)]
      : null;

    if (!randomizedFlight) {
      setSelectedFlight(null);
      setShowResult(false);
      return;
    }

    if (
      departures &&
      departures.length > 1 &&
      randomizedFlight == selectedFlight
    ) {
      // If there is more than one flight and the new random flight
      // is the same as previous, randomize again
      handleRandomizeClick();
      return;
    }

    setSelectedFlight(randomizedFlight);
    setShowResult(true);
  };

  // Resets results and selected airline
  const resetResultTable = () => {
    setShowResult(false);
    setSelectedAirlineStr("");
    setSelectedAirline(null);
    setSelectedFlight(null);
    setSelectedAircraft("");
  };

  const resetAircraftAndResultTable = () => {
    setShowResult(false);
    setSelectedAircraft("");
  }

  return (
    <>
      <Box display={"flex"} flexDir={"column"}>
        <Link href="" style={{ textDecoration: "none" }}>
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
        </Link>

        <Text fontSize={{ base: "small", sm: "medium" }} fontWeight={"bold"}>
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
            airlinesLoading: airportDataLoading,
            allAirlines: airportData?.airlines,
            selectedAirline,
            setSelectedAirline,
            selectedAirlineStr,
            setSelectedAirlineStr,
            resetAircraftAndResultTable
          }}
        />

        <AircraftSelection
          params={{
            airlinesLoading: airportDataLoading,
            selectedAirline,
            selectedAircraft,
            setSelectedAircraft
          }}
        />

        <Box>
          <Button
            fontSize={{ base: "small", sm: "medium" }}
            isLoading={airportDataLoading}
            isDisabled={
              airportDataLoading ||
              selectedAirport == null ||
              selectedAirline == null
            }
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
