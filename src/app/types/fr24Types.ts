// Data types of FlightRadar24.com unofficial API

export interface AirportsResponse {
  version: string;
  rows: AirportsRow[];
}

export interface AirportsRow {
  name: string;
  iata: string;
  icao: string;
  lat: number;
  lon: number;
  country: string;
  alt: number | string;
}

export interface AirportDetailsResponse {
  result: AirportDetailsResult;
  _api: ApiNotice;
}

export interface ApiNotice {
  copyright: string;
  legalNotice: string;
}

export interface AirportDetailsResult {
  request: AirportDetailsResultRequest;
  response: AirportDetailsResultResponse;
}

export interface AirportDetailsResultRequest {
  callback: null;
  code: string;
  device: null;
  fleet: null;
  format: string;
  limit: number;
  page: number;
  pk: null;
  plugin: null;
  "plugin-setting": PluginSetting;
  token: null;
}

export interface PluginSetting {
  schedule: PluginSettingSchedule;
  satelliteImage: SatelliteImage;
}

export interface SatelliteImage {
  scale: number;
}

export interface PluginSettingSchedule {
  mode: null;
  timestamp: number;
}

export interface AirportDetailsResultResponse {
  airport: ResponseAirport;
  airlines: Airlines;
  aircraftImages: AircraftImage[];
}

export interface AircraftImage {
  registration: string;
  images: Images;
}

export interface Images {
  thumbnails: ImageDetails[];
  medium: ImageDetails[];
  large: ImageDetails[];
}

export interface ImageDetails {
  src: string;
  link: string;
  copyright: string;
  source: ImageSource;
}

export enum ImageSource {
  JetphotosCOM = "Jetphotos.com",
}

export interface Airlines {
  codeshare: { [key: string]: Codeshare };
}

export interface Codeshare {
  name: string;
  code: Code;
}

export interface Code {
  iata: string;
  icao: string;
}

export interface ResponseAirport {
  pluginData: PluginData;
}

export interface PluginData {
  details: Details;
  flightdiary: Flightdiary;
  schedule: PluginDataSchedule;
  weather: Weather;
  aircraftCount: AircraftCount;
  runways: Runway[];
}

export interface AircraftCount {
  ground: number;
  onGround: OnGround;
}

export interface OnGround {
  visible: number;
  total: number;
}

export interface Details {
  name: string;
  code: Code;
  delayIndex: DelayIndex;
  stats: Stats;
  position: Position;
  timezone: Timezone;
  url: URL;
  airportImages: Images;
  visible: boolean;
}

export interface DelayIndex {
  arrivals: number;
  departures: number;
}

export interface Position {
  latitude: number;
  longitude: number;
  elevation?: number;
  country: PositionCountry;
  region: Region;
}

export interface PositionCountry {
  name: string;
  code: string;
  id: number;
}

export interface Region {
  city: string;
}

export interface Stats {
  arrivals: StatsClass;
  departures: StatsClass;
}

export interface StatsClass {
  delayIndex: number;
  delayAvg: number;
  percentage: ArrivalsPercentage;
  recent: Recent;
  today: Day;
  yesterday: Day;
  tomorrow: Tomorrow;
}

export interface ArrivalsPercentage {
  delayed: number;
  canceled: number;
  trend: string;
}

export interface Recent {
  delayIndex: number;
  delayAvg: number;
  percentage: ArrivalsPercentage;
  quantity: Quantity;
}

export interface Quantity {
  onTime: number;
  delayed: number;
  canceled: number;
}

export interface Day {
  percentage: TodayPercentage;
  quantity: Quantity;
}

export interface TodayPercentage {
  delayed: number;
  canceled: number;
}

export interface Tomorrow {
  percentage: QuantityClass;
  quantity: QuantityClass;
}

export interface QuantityClass {
  canceled: number;
}

export interface Timezone {
  name: string;
  offset: number;
  abbr: Abbr;
  abbrName: AbbrName | null;
  isDst: boolean;
}

export enum Abbr {
  Cet = "CET",
  Cst = "CST",
  Eet = "EET",
  Est = "EST",
  Gmt = "GMT",
  Hkt = "HKT",
  Ist = "IST",
  Jst = "JST",
  The03 = "+03",
  The04 = "+04",
  The07 = "+07",
  The08 = "+08",
  Wet = "WET",
}

export enum AbbrName {
  CentralEuropeanTime = "Central European Time",
  CentralStandardTime = "Central Standard Time",
  ChinaStandardTime = "China Standard Time",
  EasternEuropeanTime = "Eastern European Time",
  EasternStandardTime = "Eastern Standard Time",
  GreenwichMeanTime = "Greenwich Mean Time",
  HongKongTime = "Hong Kong Time",
  IndiaStandardTime = "India Standard Time",
  JapanStandardTime = "Japan Standard Time",
  WesternEuropeanTime = "Western European Time",
}

export interface URL {
  homepage: string;
  webcam: null;
  wikipedia: string;
}

export interface Flightdiary {
  url: string;
  ratings: Ratings;
  comment: Comment[];
  reviews: number;
  evaluation: number;
}

export interface Comment {
  content: string;
  author: Author;
  timestamp: number;
}

export interface Author {
  facebookId: null;
  name: string;
}

export interface Ratings {
  avg: number;
  total: number;
}

export interface Runway {
  name: string;
  length: Elevation;
  surface: Surface;
}

export interface Elevation {
  m: number;
  ft: number;
}

export interface Surface {
  code: string;
  name: string;
}

export interface PluginDataSchedule {
  arrivals: DeparturesArrivals;
  departures: DeparturesArrivals;
  ground: DeparturesArrivals;
}

export interface Aircraft {
  model: Model;
  registration: string;
  country?: AircraftCountry;
  hex: string;
  restricted?: boolean;
  serialNo: null | string;
  age?: Age;
  availability?: Availability;
  images?: null;
}

export interface Age {
  availability: boolean;
}

export interface Availability {
  serialNo: boolean;
  age: boolean;
}

export interface AircraftCountry {
  id: number;
  name: string;
  alpha2: string;
  alpha3: string;
}

export interface Model {
  code: string;
  text: string;
}

export interface Airline {
  name: string;
  code: Code;
  short: string;
}

export interface Destination {
  timezone: Timezone;
  info: Info;
}

export interface Info {
  terminal: null | string;
  baggage: null | string;
  gate: null | string;
}

export interface Origin {
  code: Code;
  timezone: Timezone;
  info: Info;
  name: string;
  position: Position;
  visible: boolean;
}

export interface Real {
  name: string;
  code: Code;
  position: Position;
  timezone: Timezone;
  visible: boolean;
}

export interface Identification {
  id: null | string;
  row: number;
  number: Number;
  callsign: null | string;
  codeshare: string[] | null;
}

export interface Number {
  default: null | string;
  alternative: null | string;
}

export interface Owner {
  name: string;
  code: Code;
  logo: null | string;
}

export interface FlightStatus {
  live: boolean;
  text: string;
  icon: Icon | null;
  estimated: null;
  ambiguous: boolean;
  generic: Generic;
}

export interface Generic {
  status: GenericStatus;
  eventTime: EventTime;
}

export interface EventTime {
  utc: number | null;
  local: number | null;
}

export interface GenericStatus {
  text: Text;
  type: Type;
  color: Icon;
  diverted: Abbr | null;
}

export enum Icon {
  Gray = "gray",
  Green = "green",
  Red = "red",
  Yellow = "yellow",
}

export enum Text {
  Delayed = "delayed",
  Diverted = "diverted",
  Estimated = "estimated",
  Landed = "landed",
  Scheduled = "scheduled",
}

export enum Type {
  Arrival = "arrival",
  Departure = "departure",
}

export interface Time {
  scheduled: DepartureArrivalTime;
  real: DepartureArrivalTime;
  estimated: DepartureArrivalTime;
  other: OtherTime;
}

export interface DepartureArrivalTime {
  departure: number | null;
  arrival: number | null;
}

export interface OtherTime {
  eta: number | null;
  duration: number | null;
}

export interface Item {
  current: number;
  total: number;
  limit: number;
}

export interface Page {
  current: number;
  total: number;
}

export interface DeparturesArrivals {
  item: Item;
  page: Page;
  timestamp: number;
  data: DepartureAndArrivalData[];
}

export interface DepartureAndArrivalData {
  flight: FlightData;
}

export interface FlightData {
  identification: Identification;
  status: FlightStatus;
  aircraft: Aircraft;
  owner: Owner | null;
  airline: Airline;
  airport: FlightAirportData;
  time: Time;
}

export interface FlightAirportData {
  origin: Destination;
  destination: Origin;
  real: Real | null;
}

export interface Weather {
  metar: string;
  time: number;
  qnh: number;
  dewpoint: Dewpoint;
  humidity: number;
  pressure: Pressure;
  sky: Sky;
  flight: WeatherFlight;
  wind: Wind;
  temp: Dewpoint;
  elevation: Elevation;
  cached: number;
}

export interface Dewpoint {
  celsius: number;
  fahrenheit: number;
}

export interface WeatherFlight {
  category: string;
}

export interface Pressure {
  hg: number;
  hpa: number;
}

export interface Sky {
  condition: Condition;
  visibility: Visibility;
}

export interface Condition {
  text: string;
}

export interface Visibility {
  km: number;
  mi: number;
  nmi: number;
}

export interface Wind {
  direction: Direction;
  speed: Speed;
}

export interface Direction {
  degree: number;
  text: string;
}

export interface Speed {
  kmh: number;
  kts: number;
  mph: number;
  text: string;
}
