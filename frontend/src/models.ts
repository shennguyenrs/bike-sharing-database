export enum DataType {
  Weather = 'weather',
  Station = 'station',
}

export enum WeatherType {
  Current = 'current',
  Forecast = 'forecast',
}

export interface WeatherData {
  last_updated: number;
  temp: number;
  pressure: number;
  humid: number;
  windspeed: number;
  cloudiness: number;
}

type WeatherWithoutTime = Omit<WeatherData, 'last_updated'>;

export interface WeatherForecastData extends WeatherWithoutTime {
  forecast_time: number;
}

export interface StationData {
  station_id: string;
  num_bike_available: number;
  num_bike_disabled: number;
  num_docks_available: number;
  num_docks_disabled: number;
  is_installed: number;
  is_renting: number;
  is_returning: number;
  last_reported: number;
}
