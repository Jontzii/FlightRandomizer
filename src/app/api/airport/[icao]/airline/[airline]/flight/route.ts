import { Flight } from "@/app/types/airlineTypes";
import { AirportDetailsResponse } from "@/app/types/fr24Types";
import { generateRequestForAirportDetails } from "@/app/api/generateRequest";
import _ from "lodash";

const generateNowPlusHoursTime = (hours: number) => {
  const now = new Date();
  now.setHours(now.getHours() + hours);
  return Math.round(now.getTime() / 1000);
};

export async function GET(
  request: Request,
  { params }: { params: { icao: string; airline: string } }
) {
  if (params.icao.length != 4) {
    return Response.json(
      { error: "Bad Request", message: "Incorrect ICAO code" },
      { status: 400 }
    );
  }

  if (params.airline.length != 3) {
    return Response.json(
      { error: "Bad Request", message: "Incorrect airline code" },
      { status: 400 }
    );
  }

  let page = 1;
  let totalPageNumber = 1;
  const softLimit = generateNowPlusHoursTime(3);
  const hardLimit = generateNowPlusHoursTime(6);
  const flights: Flight[] = [];

  do {
    const data: AirportDetailsResponse = await generateRequestForAirportDetails(
      params.icao,
      page
    );

    const pluginData = data.result.response.airport.pluginData;
    totalPageNumber = pluginData.schedule.departures.page.total;
    const departuresInPage = pluginData.schedule.departures.data;

    // No departing flights in FR24
    if (departuresInPage.length <= 0) {
      return Response.json({
        createdAt: new Date().getTime(),
        results: [],
      });
    }

    let lastDeparture = departuresInPage[departuresInPage.length - 1];
    let lastDepartureTime = lastDeparture.flight.time.scheduled.departure;

    if (!lastDepartureTime) {
      console.warn("Last departure time not set");
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }

    // Remove flights until the last one is within 12 hours from now
    if (hardLimit <= lastDepartureTime) {
      do {
        departuresInPage.pop();

        // No departing flights in the next 12h in FR24
        if (departuresInPage.length <= 0) {
          return Response.json({
            createdAt: new Date().getTime(),
            results: [],
          });
        }

        lastDeparture = departuresInPage[departuresInPage.length - 1];
        lastDepartureTime = lastDeparture.flight.time.scheduled.departure;

        if (!lastDepartureTime) {
          console.warn("Last departure time not set");
          return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
          );
        }
      } while (hardLimit <= lastDepartureTime);
    }

    departuresInPage.forEach((x) => {
      if (x.flight.airline.code.icao == params.airline) {
        // Correct airline
        flights.push({
          airline: x.flight.airline.code.icao,
          flightNumber: x.flight.identification.number.default || "",
          aircraft: x.flight.aircraft.model.code,
          departureIcao: params.icao.toUpperCase(),
          departureTime: x.flight.time.scheduled.departure || -1,
          arrivalIcao: x.flight.airport.destination.code.icao,
          arrivalName: x.flight.airport.destination.name,
          arrivalTime: x.flight.time.scheduled.arrival || -1,
        });
      }
    });

    if (softLimit < lastDepartureTime) {
      // We have all the flights for the next 6+n hours
      break;
    } else {
      page += 1;
    }
  } while (page <= totalPageNumber);

  return Response.json({
    createdAt: new Date().getTime(),
    results: _.sortBy(flights, (x) => x.departureTime),
  });
}
