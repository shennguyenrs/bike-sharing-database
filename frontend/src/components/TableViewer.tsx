import React, { useState, ChangeEvent } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
} from '@mui/material';

import {
  DataType,
  WeatherData,
  StationData,
  WeatherForecastData,
} from '../models';

const WeatherHeaders = [
  'Lasted update',
  'Tempurature (℃)',
  'Pressure (hpa)',
  'Humidity (%)',
  'Windspeed (m/s)',
  'Cloudiness (%)',
];

const StationHeaders = [
  'Station ID',
  'Number bike available',
  'Number bike disabled',
  'Number docks available',
  'Number docks disabled',
  'Is installed',
  'Is renting',
  'Is returning',
  'Last reported',
];

const TableViewer = ({
  data,
  datatype,
  weathertype,
}: {
  data: WeatherData[] | WeatherForecastData[] | StationData[];
  datatype: DataType;
  weathertype: number;
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(8);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const returnTimestampString = (time: any) => {
    if (weathertype < 2) {
      if (weathertype === 0) {
        return new Date(time.last_updated * 1000).toUTCString();
      } else {
        return new Date(time.forecast_time * 1000).toUTCString();
      }
    } else {
      return new Date(time.last_reported * 1000).toUTCString();
    }
  };

  // Handle change page
  const handleChangePage = (
    _e: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  // Handle change row per page
  const handleOnRowPerPage = (e: ChangeEvent) => {
    setRowsPerPage(parseInt((e.target as HTMLInputElement).value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {datatype === DataType.Weather
              ? WeatherHeaders.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))
              : StationHeaders.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row, id) => (
            <TableRow key={id}>
              {datatype === DataType.Weather ? (
                <>
                  <TableCell>{returnTimestampString(row)}</TableCell>
                  <TableCell>{(row as WeatherData).temp}</TableCell>
                  <TableCell>{(row as WeatherData).pressure}</TableCell>
                  <TableCell>{(row as WeatherData).humid}</TableCell>
                  <TableCell>{(row as WeatherData).windspeed}</TableCell>
                  <TableCell>{(row as WeatherData).cloudiness}</TableCell>
                </>
              ) : (
                <>
                  <TableCell>{(row as StationData).station_id}</TableCell>
                  <TableCell>
                    {(row as StationData).num_bike_available}
                  </TableCell>
                  <TableCell>
                    {(row as StationData).num_bike_disabled}
                  </TableCell>
                  <TableCell>
                    {(row as StationData).num_docks_available}
                  </TableCell>
                  <TableCell>
                    {(row as StationData).num_docks_disabled}
                  </TableCell>
                  <TableCell>{(row as StationData).is_installed}</TableCell>
                  <TableCell>{(row as StationData).is_renting}</TableCell>
                  <TableCell>{(row as StationData).is_returning}</TableCell>
                  <TableCell>{returnTimestampString(row)}</TableCell>
                </>
              )}
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 8, 12, { label: 'All', value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleOnRowPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableViewer;
