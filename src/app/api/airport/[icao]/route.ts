import _ from "lodash";
import {
  generateAirportQueryParameters,
  generateApiGetRequest,
} from "@/app/api/generateRequest";
import { AirportDetailsResponse } from "@/app/types/fr24Types";
import { AirportDataWithFlightsApi, FlightApi } from "@/app/types/apiTypes";
import { NextRequest } from "next/server";

const getAirportDataWithDepartures = async (
  icao: string
): Promise<AirportDataWithFlightsApi | null> => {
  let page = 1;
  let totalPageNumber = 1;
  let isBasicDataSet = false;
  const result: AirportDataWithFlightsApi = {
    icao: icao.toUpperCase(),
    name: "",
    airlines: [],
  };

  do {
    const data: AirportDetailsResponse = await generateApiGetRequest(
      "/airport.json",
      generateAirportQueryParameters(icao, page)
    );

    const pluginData = data.result.response.airport.pluginData;
    const departuresInPage = pluginData.schedule.departures.data;

    if (!isBasicDataSet) {
      result.name = pluginData.details.name;
      totalPageNumber = pluginData.schedule.departures.page.total;
      isBasicDataSet = true;
    }

    // No departing flights in FR24
    if (
      Object.keys(result.airlines).length === 0 &&
      departuresInPage.length <= 0
    ) {
      return result;
    }

    if (departuresInPage.length > 0) {
      departuresInPage.forEach((departure) => {
        const airlineCode = departure.flight.airline.code.icao.toUpperCase();
        const flightData: FlightApi = {
          airline: departure.flight.airline.code.icao,
          flightNumber: departure.flight.identification.number.default || "",
          aircraft: departure.flight.aircraft.model.code,
          departureIcao: icao,
          departureName: result.name,
          departureTime: departure.flight.time.scheduled.departure || -1,
          departureTimeLocalOffset:
            departure.flight.airport.origin.timezone.offset,
          arrivalIcao: departure.flight.airport.destination.code.icao,
          arrivalName: departure.flight.airport.destination.name,
          arrivalTime: departure.flight.time.scheduled.arrival || -1,
          arrivalTimeLocalOffset:
            departure.flight.airport.destination.timezone.offset,
          scheduledDuration:
            departure.flight.time.scheduled.departure &&
            departure.flight.time.scheduled.arrival
              ? departure.flight.time.scheduled.arrival -
                departure.flight.time.scheduled.departure
              : -1,
        };

        const airline = result.airlines.find((x) => x.icao === airlineCode);

        if (airline) {
          airline.departures.push(flightData);
        } else {
          result.airlines.push({
            icao: airlineCode,
            name: departure.flight.airline.short,
            departures: [flightData],
          });
        }
      });
    }

    page += 1;
  } while (page <= totalPageNumber);

  return result;
};

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { icao: string };
  }
) {
  if (params.icao.length != 4) {
    return Response.json(
      { error: "Bad Request", message: "Incorrect ICAO code" },
      { status: 400 }
    );
  }

  const res = await getAirportDataWithDepartures(params.icao);

  if (!res) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }

  return Response.json({
    createdAt: Math.round(new Date().getTime() / 1000),
    results: res,
  });
}
