export interface AirportBasicDataUi {
  icao: string;
  name: string;
}

export interface AirlineUi {
  name: string;
  icao: string;
}

export interface FlightUi {
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

export interface SettingsModelUi {
  lowerLimit: string;
  upperLimit: string;
}
