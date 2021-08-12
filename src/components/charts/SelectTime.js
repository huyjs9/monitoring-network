import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';

SelectTime.propTypes = {
	onSelectTime: PropTypes.func.isRequired,
	value: PropTypes.string,
};

export default function SelectTime(props) {
	const { onSelectTime, value } = props;
	const timeData = [
		{
			id: 1,
			time: 'Last 1 hour',
			value: '1h',
		},
		{
			id: 2,
			time: 'Last 6 hours',
			value: '6h',
		},
		{
			id: 3,
			time: 'Last 12 hours',
			value: '12h',
		},
		{
			id: 4,
			time: 'Last 1 day',
			value: '1d',
		},
		{
			id: 5,
			time: 'Last 2 days',
			value: '2d',
		},
		{
			id: 6,
			time: 'Last 7 days',
			value: '7d',
		},
	];

	const handleChange = (event) => {
		if (onSelectTime) {
			onSelectTime(event.target.value);
		}
	};

	return (
		<div>
			<FormControl variant="filled">
				<InputLabel id="demo-simple-select-filled-label">Time</InputLabel>
				<Select
					labelId="demo-simple-select-filled-label"
					id="demo-simple-select-filled"
					value={value}
					onChange={handleChange}
					style={{ width: '100px' }}
				>
					{timeData.map((value) => (
						<MenuItem value={value.value} key={value.id}>
							{value.time}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
