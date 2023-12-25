import { Airline } from "@/app/types/airlineTypes";
import { AirportDetailsResponse } from "@/app/types/fr24Types";
import { generateRequestForAirportDetails } from "../../../generateRequest";
import _ from "lodash";

const generateNowPlusHoursTime = (hours: number) => {
  const now = new Date();
  now.setHours(now.getHours() + hours);
  return Math.round(now.getTime() / 1000);
};

export async function GET(
  request: Request,
  { params }: { params: { icao: string } }
) {
  if (params.icao.length != 4) {
    return Response.json(
      { error: "Bad Request", message: "Incorrect ICAO code" },
      { status: 400 }
    );
  }

  let page = 1;
  let totalPageNumber = 1;
  const nowPlus6Hours = generateNowPlusHoursTime(6);
  const nowPlus12Hours = generateNowPlusHoursTime(12);
  const airlines: Airline[] = [];

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
    if (nowPlus12Hours <= lastDepartureTime) {
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
      } while (nowPlus12Hours <= lastDepartureTime);
    }

    departuresInPage.forEach((x) =>
      airlines.push({
        name: x.flight.airline.name,
        icao: x.flight.airline.code.icao,
      })
    );

    if (nowPlus6Hours < lastDepartureTime) {
      // We have all the flights for the next 6+n hours
      break;
    } else {
      page += 1;
    }
  } while (page <= totalPageNumber);

  return Response.json({
    createdAt: new Date().getTime(),
    results: _.sortBy(
      _.uniqBy(airlines, (e) => e.icao),
      (x) => x.icao
    ),
  });
}
