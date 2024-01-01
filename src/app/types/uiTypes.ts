export interface SettingsModelUi {
  lowerLimit: number;
  upperLimit: number;
}

export interface AirportBasicDataUi {
  icao: string;
  name: string;
}

export interface AirlineBasicDataUi {
  name: string;
  icao: string;
}

export interface FlightUi {
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

export interface AirlineDataWithFlightsUi extends AirlineBasicDataUi {
  departures: FlightUi[];
}

export interface AirportDataWithFlightsUi extends AirportBasicDataUi {
  airlines: AirlineDataWithFlightsUi[];
}
