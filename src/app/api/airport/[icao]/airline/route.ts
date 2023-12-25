import { Airline } from "@/app/types/airlineTypes";
import { AirportDetailsResponse } from "@/app/types/fr24Types";
import { generateRequestForAirportDetails } from "../../../generateRequest";
import _ from "lodash";

export async function GET(
  request: Request,
  { params }: { params: { icao: string } }
) {
  if (params.icao.length != 4) {
    return Response.error();
  }

  let page = 1;
  let totalPage = 1;
  const now = new Date();
  now.setHours(now.getHours() + 6);
  const nowPlus6Hours = Math.round(now.getTime() / 1000);

  const airlines: Airline[] = [];

  do {
    const data: AirportDetailsResponse = await generateRequestForAirportDetails(
      params.icao,
      page
    );

    const pluginData = data.result.response.airport.pluginData;
    totalPage = pluginData.schedule.departures.page.total;

    const depatures = pluginData.schedule.departures.data;
    const lastDeparture = depatures[depatures.length - 1];
    const lastDepartureTime = lastDeparture.flight.time.scheduled.departure;

    depatures.forEach((x) =>
      airlines.push({
        name: x.flight.airline.short,
        icao: x.flight.airline.code.icao,
      })
    );

    if (lastDepartureTime && nowPlus6Hours <= lastDepartureTime) {
      break;
    }

    page += 1;
  } while (page <= totalPage);

  return Response.json({
    createdAt: new Date().getTime(),
    results: _.sortBy(
      _.uniqBy(airlines, (e) => e.icao),
      (e) => e.name
    ),
  });
}
