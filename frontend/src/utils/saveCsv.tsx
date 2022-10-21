import {
  WeatherData,
  StationData,
  WeatherForecastData,
  WeatherType,
} from '../models';

export const saveWeather = (
  rows: WeatherData[] | WeatherForecastData[],
  type: WeatherType
): string => {
  let csvContent = '';

  const headers =
    (type == WeatherType.Current ? 'last_updated' : 'forecast_time') +
    ';temp;pressure;humid;windSpeed;cloud\n';

  csvContent += headers;

  csvContent += rows
    .map((row) => {
      let rowStr = '';

      rowStr +=
        type === WeatherType.Current
          ? (row as WeatherData).last_updated
          : (row as WeatherForecastData).forecast_time;
      rowStr += ';';
      rowStr += row.temp;
      rowStr += ';';
      rowStr += row.pressure;
      rowStr += ';';
      rowStr += row.humid;
      rowStr += ';';
      rowStr += row.windspeed;
      rowStr += ';';
      rowStr += row.cloudiness;

      return rowStr;
    })
    .join('\n');

  return csvContent;
};

export const saveStation = (rows: StationData[]): string => {
  let csvContent = '';

  const headers =
    'station_id;num_bike_available;num_bike_disabled;num_docks_available;num_docks_disabled;is_installed;is_renting;is_returning;last_reported\n';

  csvContent += headers;

  csvContent += rows
    .map((row) => {
      let rowStr = '';

      rowStr += row.station_id;
      rowStr += ';';
      rowStr += row.num_bike_available;
      rowStr += ';';
      rowStr += row.num_bike_disabled;
      rowStr += ';';
      rowStr += row.num_docks_available;
      rowStr += ';';
      rowStr += row.num_docks_disabled;
      rowStr += ';';
      rowStr += row.is_installed;
      rowStr += ';';
      rowStr += row.is_renting;
      rowStr += ';';
      rowStr += row.is_returning;
      rowStr += ';';
      rowStr += row.last_reported;

      return rowStr;
    })
    .join('\n');

  return csvContent;
};
