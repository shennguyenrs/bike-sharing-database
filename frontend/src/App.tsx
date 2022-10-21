import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

// Components
import NavBar from './components/NavBar';
import TableViewer from './components/TableViewer';

// Services
import apiService from './services/apiService';

// Utils
import { saveWeather, saveStation } from './utils/saveCsv';

// Models
import {
  WeatherData,
  StationData,
  DataType,
  WeatherForecastData,
  WeatherType,
} from './models';

const filenameArr = [
  'current_weather.csv',
  'forecast_weather.csv',
  'station_status.csv',
];

const App = () => {
  const [allData, setAllData] = useState([[], [], []]);
  const [currentData, setCurrentData] = useState<
    WeatherData[] | WeatherForecastData[] | StationData[]
  >([]);
  const [filename, setFilename] = useState<string>('');
  const [currentFiletype, setCurrentFiletype] = useState<DataType>(
    DataType.Weather
  );
  const [tabValue, setTabValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataArr = await apiService.getAll();
        setAllData(dataArr);
        setCurrentData(dataArr[tabValue]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    setLoading(false);
  }, []);

  useEffect(() => {
    setFilename(filenameArr[tabValue]);

    if (tabValue <= 1) {
      setCurrentFiletype(DataType.Weather);
    } else {
      setCurrentFiletype(DataType.Station);
    }

    setCurrentData([...allData[tabValue]]);
  }, [tabValue]);

  // Handle save file csv
  const handleSaveFile = () => {
    const element = document.createElement('a');
    let generatedString = '';

    if (tabValue < 2) {
      const type =
        (tabValue === 0 && WeatherType.Current) || WeatherType.Forecast;

      generatedString = saveWeather(
        currentData as WeatherData[] | WeatherForecastData[],
        type
      );
    } else {
      generatedString = saveStation(currentData as StationData[]);
    }

    const file = new Blob([generatedString], {
      type: 'text/csv;charset=UTF-8',
    });

    element.href = window.URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  };

  // Handle change tabs
  const handleChangeTab = (
    _e: SyntheticEvent,
    newValue: React.SetStateAction<number>
  ) => {
    setTabValue(newValue);
  };

  if (loading) return <>Loading...</>;

  return (
    <Box sx={{ p: '2rem' }}>
      <NavBar clickButton={handleSaveFile} />
      <Tabs value={tabValue} onChange={handleChangeTab}>
        <Tab label="Current Weather" />
        <Tab label="Forecast Weather" />
        <Tab label="Station status" />
      </Tabs>
      <TableViewer
        data={currentData}
        datatype={currentFiletype}
        weathertype={tabValue}
      />
    </Box>
  );
};

export default App;
