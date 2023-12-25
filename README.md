# FlightRandomizer

Small Next.js application that can randomly select a flight of a specific airline departing from a selected airport.

## Info

### Reason for doing this?

Mostly for my flight simulation hobby. I play around with FlightRadar24.com constantly finding interesting flights. Of course, it could also be used to decide a last minute destination at an airport :)

### How to run

Run it like any other Next.js application, i.e. `npm install` and `npm run dev`. The application doesn't have any dependencies of databases or the like.

### Airports

Enter ICAO code (4 letters) of the airport in the airport input. The application will indicate to user if the code is incorrect (or not found in FlightRadar24 systems).

### Flights

The application finds all the flights leaving in the next 6 hours and as the flights are received in batches of 100 there might be some flights which take off later. However, flights leaving after now + 12 hours are discarded.

## Disclaimer

The app depends on an unofficial/undocumented API by FlightRadar24.com which could change at any time, breaking the app.
