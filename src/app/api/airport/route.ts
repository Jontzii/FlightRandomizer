import { generateGetRequest } from '@/api/generateRequest';
import { AirportBasicDataApi } from '@/types/apiTypes';
import { AirportsResponse } from '@/types/fr24Types';

const airportsAddress = '/_json/airports.php';

export async function GET() {
  const data = await generateGetRequest<AirportsResponse>(airportsAddress);
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
