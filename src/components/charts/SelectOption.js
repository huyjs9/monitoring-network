import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

SelectOption.propTypes = {
	onSelected: PropTypes.func.isRequired,
	value: PropTypes.string,
};

export default function SelectOption(props) {
	const { onSelected, value } = props;
	const hostData = useSelector((state) => state.host);

	const handleChange = (event) => {
		if (onSelected) {
			onSelected(event.target.value);
		}
	};

	return (
		<div>
			<FormControl variant="filled">
				<InputLabel id="demo-simple-select-filled-label">Host</InputLabel>
				<Select
					labelId="demo-simple-select-filled-label"
					id="demo-simple-select-filled"
					value={value}
					onChange={handleChange}
					style={{ width: '100px' }}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{hostData.map((value) => (
						<MenuItem value={value.hostid}>{value.host}</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
