export interface ApiResponse<T> {
  version?: string;
  createdAt: number;
  results: T;
}

export interface AirportBasicDataApi {
  icao: string;
  name: string;
}

export interface AirlineBasicDataApi {
  name: string;
  icao: string;
}

export interface FlightApi {
  airline: string;
  flightNumber: string;
  aircraft: string;
  departureIcao: string;
  departureName: string;
  departureTime: number;
  departureTimeLocalOffset: number;
  arrivalIcao: string;
  arrivalName: string;
  arrivalTime: number;
  arrivalTimeLocalOffset: number;
  scheduledDuration: number;
}

export interface AirlineAirportDataWithFlights extends AirlineBasicDataApi {
  departures: FlightApi[];
}

export interface AirportDataWithFlights extends AirportBasicDataApi {
  airlines: AirlineAirportDataWithFlights[];
}
