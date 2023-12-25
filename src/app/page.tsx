"use client"

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  IconButton,
  Text,
  Select,
  useColorMode,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import useSWR from "swr";
import { ApiResponse } from "./types/apiResponse";
import { useState } from "react";
import { AirportBasicData } from "./types/airportTypes";
import AirportSelection from "./components/airportSelection";
import { Airline } from "./types/airlineTypes";
import AirlineSelection from "./components/airlineSelection";

//@ts-expect-error Example taken straigh from docs
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [selectedAirport, setSelectedAirport] = useState<AirportBasicData | null>(null);
  const [selectedAirline, setSelectedAirline] = useState<Airline | null>(null);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box display={"flex"} flexDir={"column"}>
        <Text
          bgGradient="linear(to-l, #3300ff, #0084ff)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          justifyItems={"center"}
          textAlign={"center"}
          pt={4}
          pb={4}
        >
          Flight randomizer
        </Text>

        <Text fontSize={"sm"} fontWeight={"bold"}>
          You can use this application to randomly select a flight from one
          airport with a specific airline.
        </Text>

        <AirportSelection params={{selectedAirport, setSelectedAirport}} />

        <AirlineSelection params={{selectedAirport, selectedAirline, setSelectedAirline}} />

        <Box>
          <Button>Randomize</Button>
        </Box>
      </Box>
      <IconButton
        position={"absolute"}
        top={4}
        right={4}
        onClick={toggleColorMode}
        aria-label={
          colorMode === "light" ? "Switch to dark mode" : "Switch to light mode"
        }
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      />
      <Text
        fontSize="sm"
        fontWeight={"normal"}
        position={"absolute"}
        textAlign={"center"}
        width={"100%"}
        bottom={2}
        left={0}
      >
        Made by{" "}
        <Link
          href="https://www.github.com/jontzii"
          rel="noreferrer noopener"
          target="_blank"
          color="blue.500"
          _hover={{ color: "blue.600" }}
        >
          @Jontzii
        </Link>
        <br />
        Utilises data from{" "}
        <Link
          href="https://www.flightradar24.com"
          rel="noreferrer noopener"
          target="_blank"
          color="blue.500"
          _hover={{ color: "blue.600" }}
        >
          flightradar24.com
        </Link>
      </Text>
    </>
  );
}
