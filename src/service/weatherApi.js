import { noneAuthGet } from './tools';
import { LOCATIONIQ_API_KEY, OPEN_WEATHER_MAP_API_KEY } from './constant';
class WeatherApi {
	static getLatAndLongByLocation = async (location) => {
		const res = await noneAuthGet(
			`https://eu1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${location}&format=json`
		);

		return res;
	};

	static getWeatherForeCast = async (lat, lon) => {
		const res =
			await noneAuthGet(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&
  exclude=current,minutely,hourly&appid=${OPEN_WEATHER_MAP_API_KEY}`);

		return res;
	};
}

export default WeatherApi;
