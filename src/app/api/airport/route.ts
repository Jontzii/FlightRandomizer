import { AirportBasicData } from "@/app/types/uiTypes";
import { AirportsResponse } from "@/app/types/fr24Types";
import { generateGetRequest } from "../generateRequest";

const airportsAddress = "/_json/airports.php";

export async function GET() {
  const data: AirportsResponse = await generateGetRequest(airportsAddress);
  const results: AirportBasicData[] = data.rows.map((airport) => {
    return {
      icao: airport.icao,
      name: airport.name,
    };
  });

  return Response.json({
    version: data.version,
    createdAt: new Date().getTime(),
    results,
  });
}
