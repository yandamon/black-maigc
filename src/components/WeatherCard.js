import React from 'react';
import { Grid } from '@material-ui/core';

import './WeatherCard.scss';

const getTime = (timeStamp) => {
	const dateObject = new Date(timeStamp * 1000);
	return dateObject.toLocaleDateString('en-au', {
		month: 'long',
		day: 'numeric',
		weekday: 'long',
	});
};

const WeatherCard = ({ weatherData }) => {
	return (
		<Grid container item xs={8} className="weather-card">
			<Grid item xs={6}>
				{getTime(weatherData.dt) || 'unknown'}
			</Grid>
			<Grid item xs={6}>
				{`high: ${weatherData.temp?.max || 'unknown'}`}
			</Grid>
			<Grid item xs={6}>
				{weatherData.weather[0]?.main || 'unknown'}
			</Grid>
			<Grid item xs={6}>
				{`low: ${weatherData.temp?.min || 'unknown'}`}
			</Grid>
		</Grid>
	);
};

export default WeatherCard;
