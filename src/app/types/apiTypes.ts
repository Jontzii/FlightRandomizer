export interface ApiResponse<T> {
  version?: string;
  createdAt: number;
  results: T;
}

export interface AirportBasicDataApi {
  icao: string;
  name: string;
}

export interface AirlineApi {
  name: string;
  icao: string;
}

export interface FlightApi {
  airline: string;
  flightNumber: string;
  aircraft: string;
  departureIcao: string;
  departureTime: number;
  arrivalIcao: string;
  arrivalName: string;
  arrivalTime: number;
}
