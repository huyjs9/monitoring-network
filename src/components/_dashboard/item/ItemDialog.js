/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLable,
	Zoom,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import itemApi from 'src/api/itemApi';
import { setItem } from 'src/app/itemSlice';
import { setHostid } from 'src/app/hostidSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Zoom direction="left" ref={ref} {...props} />;
});

// UserDialog.propTypes = {
// 	open: PropTypes.bool,
// 	setOpen: PropTypes.func,
// };

// UserDialog.defaultTypes = {
// 	open: false,
// };

function RadioButtonsGroup(props) {
	const [value, setValue] = React.useState(null);
	const { hostData } = props;
	const dispatch = useDispatch();

	const handleChange = (event) => {
		setValue(event.target.value);
		dispatch(setHostid(event.target.value));
	};

	// const handleClick = () => {
	// 	dispatch(setHostid(value));
	// };

	return (
		<FormControl>
			<RadioGroup
				// aria-label="gender"
				value={value}
				onChange={handleChange}
				// onClick={handleClick}
			>
				{hostData.map((value) => (
					<FormControlLabel
						value={value.hostid}
						control={<Radio />}
						label={value.host}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}

export default function UserDialog(props) {
	const { open, onClose } = props;
	const hostData = useSelector((state) => state.host);
	const ipUrl = useSelector((state) => state.ipaddress);
	const hostid = useSelector((state) => state.hostid);
	const dispatch = useDispatch();

	useEffect(() => {
		async function AutoItem() {
			try {
				if (hostid) {
					const itemData = await itemApi.post(ipUrl, hostid);
					dispatch(setItem(itemData.data.result));
				}
			} catch (err) {
				console.log(err.message);
			}
		}
		AutoItem();
		const timeInterval = setInterval(AutoItem, 30000);
		return () => {
			clearInterval(timeInterval);
		};
	}, [open]);

	// const handleClick = async () => {
	// 	try {
	// 		const itemData = await itemApi.post(ipUrl, hostid);
	// 		// setInterval(itemData, 3000);
	// 		dispatch(setItem(itemData.data.result));
	// 		console.log('data ne', itemData.data.result);
	// 	} catch (err) {
	// 		throw err;
	// 	}
	// };

	return (
		<div>
			{hostData && hostData.length > 0 && (
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={onClose}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					{/* <DialogTitle id="alert-dialog-slide-title">
					{"Use Google's location service?"}
				</DialogTitle> */}

					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">
							<RadioButtonsGroup
								onClose={onClose}
								hostData={hostData}
							/>
						</DialogContentText>
					</DialogContent>

					<DialogActions>
						<Button
							onClick={() => {
								onClose();
								// handleClick();
							}}
							color="primary"
						>
							OK
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</div>
	);
}
