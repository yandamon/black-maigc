import React from 'react';
import { Autocomplete as MaterialAutocomplete } from '@material-ui/lab';
import { FormControl, TextField } from '@material-ui/core';

import './AutocompleteText.scss';

const AutocompleteTextField = ({
	options = [],
	selectedValue = {},
	inputValue = '',
	disabled = false,
	getOptionLabel = () => 'Missing display rule',
	className = '',
	debug = false,
	onInputChange = () => null,
	onSelect = () => null,
	placeholder = '',
	label = '',
	error = false,
}) => {
	return (
		<FormControl className="autocompleteFormControl">
			<MaterialAutocomplete
				options={options}
				value={selectedValue}
				onChange={(event, newValue) => {
					onSelect(newValue);
				}}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					onInputChange(newInputValue);
				}}
				getOptionLabel={getOptionLabel}
				disabled={disabled}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder={placeholder}
						label={label}
						type="text"
						name="autocomplete-input"
						error={error}
					/>
				)}
				debug={debug}
				className={className}
			/>
		</FormControl>
	);
};

export default AutocompleteTextField;
