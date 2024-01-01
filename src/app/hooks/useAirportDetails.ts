"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { AirportDataWithFlightsApi, ApiResponse } from "@/app/types/apiTypes";
import { AirportBasicDataUi, SettingsModelUi } from "@/app/types/uiTypes";

//@ts-expect-error Example taken straigh from docs
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

const hoursToUnixSeconds = (hoursFromNow: number): number => {
  const date = new Date();
  date.setTime(date.getTime() + hoursFromNow * 60 * 60 * 1000);

  return Math.round(date.getTime() / 1000);
};

export default function useAirportDetails(
  userLimits: SettingsModelUi,
  selectedAirport: AirportBasicDataUi | null
) {
  const [filteredData, setFilteredData] =
    useState<AirportDataWithFlightsApi | null>(null);
  const { data, error, isLoading } = useSWR<
    ApiResponse<AirportDataWithFlightsApi>,
    Error
  >(
    selectedAirport
      ? `/api/airport/${selectedAirport?.icao.toLowerCase()}`
      : null,
    fetcher
  );

  useEffect(() => {
    const filterAirportDataBasedOnLimits = (
      data: AirportDataWithFlightsApi,
      start: number,
      end: number
    ) => {
      data.airlines.forEach((airline) => {
        airline.departures = airline.departures.filter((flight) => {
          console.log(
            `Flight ${flight.flightNumber} - dep: ${flight.departureTime}`
          );
          return start <= flight.departureTime && flight.departureTime <= end;
        });
      });

      data.airlines = data.airlines.filter((airline) => {
        return airline.departures.length > 0;
      });

      return data;
    };

    if (!data) {
      setFilteredData(null);
      return;
    }

    const start = hoursToUnixSeconds(userLimits.lowerLimit);
    const end = hoursToUnixSeconds(userLimits.upperLimit);

    const filtered = filterAirportDataBasedOnLimits(data.results, start, end);
    setFilteredData(filtered);
  }, [data, userLimits]);

  return filteredData;
}
