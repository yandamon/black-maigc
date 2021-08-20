import React, { useState } from 'react';
import WeatherApi from '../service/weatherApi';
import AutocompleteTextField from '../components/AutocompleteText';
import WeatherCard from '../components/WeatherCard';
import { Grid } from '@material-ui/core';

import './Weather.scss';

const Weather = () => {
	const defaultLabel = 'Please enter your location';

	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [locationList, setLocationList] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	const [errorInfo, setErrorInfo] = useState('');
	const [autoCompleteLabel, setAutoCompleteLabel] = useState('');

	const [weatherList, setWeatherList] = useState([]);

	const doSearch = (input) => {
		if (loading) {
			return;
		}
		setSearchTerm(input);
		setErrorMessage('');
		setErrorInfo('');

		if (!input || input === 'undefined') {
			setSearchTerm('');
			setLocationList([]);
			setAutoCompleteLabel();
			return;
		}
		if (input.split('').length > 1) {
			setLoading(true);
			setAutoCompleteLabel('Loading matching locations..');
			WeatherApi.getLatAndLongByLocation(input)
				.then((res) => {
					const result = res.data;
					setAutoCompleteLabel('Please select your location');
					if (!result.length || !result.length > 0) {
						setErrorMessage(`No result found matching ${input}`);
						setAutoCompleteLabel(defaultLabel);
					}
					setLocationList(result);

					if (result.length === 1) {
						doWeatherSearch(result[0]);
					} else {
						setLoading(false);
					}
				})
				.catch((error) => {
					setErrorMessage('Failed to get data, please try again');
					setAutoCompleteLabel(defaultLabel);
					setLoading(false);
				});
		}
	};

	const doWeatherSearch = (selectedSuburb) => {
		setErrorInfo('');
		setLocationList([]);
		setSelectedLocation(selectedSuburb);
		setAutoCompleteLabel(defaultLabel);
		setLoading(true);
		if (!selectedSuburb) {
			setLoading(false);
			return;
		}

		WeatherApi.getWeatherForeCast(selectedSuburb.lat, selectedSuburb.lon)
			.then((res) => {
				const result = res.data;

				!result ||
					(!result.daily.length &&
						setErrorInfo('No result found, please try another location'));

				setWeatherList(result.daily);
			})
			.catch((error) => {
				setErrorInfo('Failed to find result, please try again later');
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<Grid container className="search-container">
			<Grid item xs={12}>
				<AutocompleteTextField
					options={locationList}
					id="postcode-search"
					className="postcode-search"
					selectedValue={selectedLocation}
					placeholder={defaultLabel}
					label={errorMessage ? errorMessage : autoCompleteLabel}
					onSelect={doWeatherSearch}
					onInputChange={doSearch}
					inputValue={searchTerm}
					getOptionLabel={(option) => `${option.display_name}`}
					searchIcon={true}
					error={!!errorMessage}
				/>
			</Grid>
			<Grid item container xs={12}>
				{weatherList &&
					weatherList.length > 0 &&
					weatherList.map((dailyData) => (
						<WeatherCard weatherData={dailyData} />
					))}
			</Grid>
			{errorInfo && (
				<Grid item xs={12}>
					{errorInfo}
				</Grid>
			)}
		</Grid>
	);
};

export default Weather;
