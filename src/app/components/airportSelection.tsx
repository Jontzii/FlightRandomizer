"use client";

import useSWR from "swr";
import { AirportBasicData } from "../types/airportTypes";
import { ApiResponse } from "../types/apiResponse";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";

//@ts-expect-error Example taken straigh from docs
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export default function AirportSelection({
  params,
}: {
  params: {
    selectedAirport: AirportBasicData | null;
    setSelectedAirport: (val: AirportBasicData | null) => void;
    resetResultTable: () => void;
  };
}) {
  const [selectedAirportIcao, setSelectAirportIcao] = useState("");
  const [airportInvalid, setAirportInvalid] = useState(false);

  const { data, error, isLoading } = useSWR<
    ApiResponse<AirportBasicData[]>,
    Error
  >("/api/airport", fetcher);

  const validateInput = (input: String): void => {
    if (data == null || input.length != 4) {
      setAirportInvalid(false);
      params.resetResultTable();
      params.setSelectedAirport(null);
      return;
    }

    const filtered = data?.results.filter((airport) => airport.icao === input);
    const found = filtered.length == 1;

    if (found) {
      setAirportInvalid(false);
      params.setSelectedAirport(filtered[0]);
    } else {
      setAirportInvalid(!found);
      params.resetResultTable();
      params.setSelectedAirport(null);
    }
  };

  return (
    <FormControl textAlign={"left"} pt={4} pb={4} isInvalid={airportInvalid}>
      <FormLabel>Airport</FormLabel>
      <Input
        maxLength={4}
        placeholder="EFHK"
        value={selectedAirportIcao}
        onChange={(e) => {
          setSelectAirportIcao(e.target.value.toUpperCase());
          validateInput(e.target.value.toUpperCase());
        }}
      />
      {airportInvalid ? (
        <FormErrorMessage>Invalid ICAO code</FormErrorMessage>
      ) : (
        <FormHelperText>
          {params.selectedAirport ? (
            params.selectedAirport.name
          ) : (
            <Link
              href="https://en.wikipedia.org/wiki/ICAO_airport_code"
              target="_blank"
            >
              Airport ICAO code
            </Link>
          )}
        </FormHelperText>
      )}
    </FormControl>
  );
}
