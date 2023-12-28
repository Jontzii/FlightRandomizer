export interface Airline {
  name: string;
  icao: string;
}

export interface Flight {
  airline: string;
  flightNumber: string;
  aircraft: string;
  departureIcao: string;
  departureName?: string;
  departureTime: number;
  arrivalIcao: string;
  arrivalName: string;
  arrivalTime: number;
}
