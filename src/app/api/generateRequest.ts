const baseAddress = "https://www.flightradar24.com";
const apiBaseAddress = "https://api.flightradar24.com/common/v1";

const commonHeaders = {
  accept: "application/json",
  "accept-encoding": "gzip, br",
  "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
  "cache-control": "max-age=0",
  origin: "https://www.flightradar24.com",
  referer: "https://www.flightradar24.com/",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "user-agent":
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
};

export const generateGetRequest = async (requestUrl: string): Promise<any> => {
  const res = await fetch(baseAddress + requestUrl, {
    headers: commonHeaders,
  });

  return await res.json();
};

export const generateRequestForAirportDetails = async (
  icao: string,
  page: number
): Promise<any> => {
  const endpoint = "/airport.json";
  const parameters = `?format=json&code=${icao}&limit=100&page=${page}`;

  const res = await fetch(apiBaseAddress + endpoint + parameters, {
    headers: commonHeaders,
  });

  return await res.json();
};
