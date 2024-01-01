# FlightRandomizer

Small Next.js application that can randomly select a flight of a specific airline departing from a selected airport.

## Info

### Reason for doing this?

Mostly for my flight simulation hobby. I play around with FlightRadar24.com constantly finding interesting flights. Of course, it could also be used to decide a last-minute destination at an airport :)

### How to run

Run it like any other Next.js application, i.e. `npm install` and `npm run dev`. The application doesn't have any dependencies on databases or the like.

### Airports

Enter the ICAO code (4 letters) of the airport in the airport input. The application will indicate to the user if the code is incorrect (or not found in FlightRadar24 systems).

### Flights

The application needs to get all departing flights from FR24, as it seems like their pagination is not always sorted by the departure date. The application filters out results before and after the user's time window set in the settings modal (default 30m-3h).

## Disclaimer

The app depends on an unofficial/undocumented API by FlightRadar24.com, which could change at any time, breaking the app.

## Future ideas

Combine flight query inside the airline API so that only API query needs to be done.
