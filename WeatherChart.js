import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

function WeatherChart() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/weather/Johannesburg')
      .then(res => setWeatherData(res.data));
  }, []);

  return (
    <LineChart width={500} height={300} data={weatherData}>
      <XAxis dataKey="date" />
      <YAxis dataKey="temperature" />
      <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
    </LineChart>
  );
}
export default WeatherChart;
