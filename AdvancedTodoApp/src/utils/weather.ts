import axios from 'axios';
import { WEATHER_API_KEY } from '@env';

interface WeatherData {
  temperature: number | string;
  description: string;
}

export const fetchWeather = async (location: string): Promise<WeatherData> => {
  try {
    const WEATHER_API_URL = `http://dataservice.accuweather.com/currentconditions/v1/324503`;

    const response = await axios.get(WEATHER_API_URL, {
      params: {
        apikey: WEATHER_API_KEY,
        q: location,
        language: 'en',
        details: true,
        metric: true,
      },
    });

    const weatherInfo = response.data[0]; // Assuming response data contains an array
    return {
      temperature: weatherInfo.Temperature.Metric.Value,
      description: weatherInfo.WeatherText,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      temperature: 'N/A',
      description: 'N/A',
    };
  }
};
