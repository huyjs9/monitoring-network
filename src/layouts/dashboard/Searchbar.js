/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from '@iconify/react';
import { useState } from 'react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { experimentalStyled as styled, alpha } from '@material-ui/core/styles';
import {
	Box,
	Input,
	Slide,
	Button,
	InputAdornment,
	ClickAwayListener,
	IconButton,
	Backdrop,
	CircularProgress,
} from '@material-ui/core';

import { useEffect } from 'react';
import adminApi from 'src/api/adminApi';
import axios from 'axios';
import hostApi from 'src/api/hostApi';
import { setIp } from 'src/app/ipSlice';
import { setHost } from 'src/app/hostSlice';
import { useDispatch } from 'react-redux';
import itemApi from 'src/api/itemApi';
// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
	top: 0,
	left: 0,
	zIndex: 99,
	width: '100%',
	display: 'flex',
	position: 'absolute',
	alignItems: 'center',
	height: APPBAR_MOBILE,
	backdropFilter: 'blur(6px)',
	WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
	padding: theme.spacing(0, 3),
	boxShadow: theme.customShadows.z8,
	backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
	[theme.breakpoints.up('md')]: {
		height: APPBAR_DESKTOP,
		padding: theme.spacing(0, 5),
	},
}));

// ----------------------------------------------------------------------

export default function Searchbar(props) {
	const [isOpen, setOpen] = useState(false);
	const [openbd, setOpenbd] = useState(false);
	const [isSubmit, setSubmit] = useState(false);

	const { ipUrl, setIpUrl } = props;
	const dispatch = useDispatch();

	const handleOpen = () => {
		setOpen((prev) => !prev);
		setOpenbd(false);
	};

	const handleClose = (e) => {
		setTimeout(() => {
			setOpen(false);
		}, 1000);
	};

	// useEffect(() => {
	// 	if (isSubmit.length > 0) {
	// 		setOpenbd(true);
	// 	}
	// }, [isSubmit]);
	const handleToggle = () => {
		setOpenbd(true);
	};

	const handleCloseBD = () => {
		setOpenbd(false);
	};

	const handleChange = (e) => {
		e.preventDefault();
		setIpUrl(e.target.value);
	};

	const handleClick = async () => {
		try {
			if (ipUrl && ipUrl.length > 6 && ipUrl.includes('.')) {
				const tokenZabbix = await adminApi.post(ipUrl);
				const hostData = await hostApi.post(ipUrl);

				setTimeout(() => {
					const action = setIp(ipUrl);
					dispatch(action);
					dispatch(setHost(hostData.data.result));
				}, 1000);

				setSubmit(true);
				console.log('tokenZabbix', tokenZabbix.data.result);
				console.log('hostData', hostData.data.result);

				localStorage.setItem(
					'tokenZabbix',
					JSON.stringify(tokenZabbix.data.result)
				);
			} else {
				alert('Wrong IP Address!!!');
			}
		} catch (err) {
			console.log('Failed to get Zabbix token', err);
		}
	};

	return (
		<ClickAwayListener onClickAway={handleClose}>
			<div>
				{!isOpen && (
					<IconButton onClick={handleOpen}>
						<Icon icon={searchFill} width={20} height={20} />
					</IconButton>
				)}

				<Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
					<SearchbarStyle>
						<Input
							autoFocus
							fullWidth
							disableUnderline
							placeholder="IP Address…"
							onChange={handleChange}
							startAdornment={
								<InputAdornment position="start">
									<Box
										component={Icon}
										icon={searchFill}
										sx={{
											color: 'text.disabled',
											width: 20,
											height: 20,
										}}
									/>
								</InputAdornment>
							}
							sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
						/>
						<Button
							variant="contained"
							onClick={() => {
								handleClose();
								handleClick();
								handleToggle();
							}}
						>
							GET
						</Button>
						{isSubmit && (
							<Backdrop
								sx={{
									color: '#fff',
									zIndex: (theme) => theme.zIndex.drawer + 1,
								}}
								open={openbd}
								onClick={handleCloseBD}
							>
								<CircularProgress color="inherit" />
							</Backdrop>
						)}
					</SearchbarStyle>
				</Slide>
			</div>
		</ClickAwayListener>
	);
}
