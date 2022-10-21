import axios from 'axios';

const baseURL = 'http://localhost:3001';

// Get all data from backend
const getAll = async () => {
  const current = axios.get('/api/weather/current');
  const forecast = axios.get('/api/weather/forecast');
  const stations = axios.get('/api/stations');

  let returnData: any[] = [];

  await axios
    .all([current, forecast, stations])
    .then(
      axios.spread((...res) => {
        returnData = [res[0].data, res[1].data, res[2].data];
      })
    )
    .catch((err) => {
      console.log(err);
    });

  return returnData;
};

export default { getAll };
