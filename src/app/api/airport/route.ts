import { generateGetRequest } from "@/app/api/generateRequest";
import { AirportsResponse } from "@/app/types/fr24Types";
import { AirportBasicDataApi } from "@/app/types/apiTypes";

const airportsAddress = "/_json/airports.php";

export async function GET() {
  const data: AirportsResponse = await generateGetRequest(airportsAddress);
  const results: AirportBasicDataApi[] = data.rows.map((airport) => {
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
