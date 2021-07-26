/* eslint-disable react-hooks/exhaustive-deps */
import faker from 'faker';
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { set, sub, formatDistanceToNow } from 'date-fns';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
import checkBold from '@iconify-icons/mdi/check-bold';
// material
import { alpha } from '@material-ui/core/styles';
import {
	Box,
	List,
	Badge,
	Button,
	Avatar,
	Tooltip,
	Divider,
	ListItem,
	IconButton,
	Typography,
	ListItemText,
	ListSubheader,
	ListItemAvatar,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	Alert,
	AlertTitle,
	AppBar,
	Toolbar,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@material-ui/core';
import Label from 'src/components/Label';
import closeCircle from '@iconify-icons/mdi/close-circle';
// utils
import { mockImgAvatar } from '../../utils/mockImages';
import { v4 as uuidv4 } from 'uuid';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'src/firebase';
import alertApi from 'src/api/alertApi';
import { setAlertLength } from 'src/app/alertLengthSlice';

// ----------------------------------------------------------------------

function renderContent(notification) {
	const title = (
		<Typography variant="subtitle2">
			{notification.title}
			<Typography
				component="span"
				variant="body2"
				sx={{ color: 'text.secondary' }}
			>
				&nbsp; {noCase(notification.description)}
			</Typography>
		</Typography>
	);
	if (notification.title === 'Resolved') {
		return {
			avatar: (
				<img
					alt={notification.title}
					src="/static/icons/ic_notification_checked.svg"
				/>
			),
			title,
		};
	}
	if (notification.title === 'Disaster') {
		return {
			avatar: (
				<img
					alt={notification.title}
					src="/static/icons/ic_notification_error.svg"
				/>
			),
			title,
		};
	}

	return {
		avatar: <img alt={notification.title} src={notification.avatar} />,
		title,
	};
}

NotificationItem.propTypes = {
	notification: PropTypes.object.isRequired,
	num: PropTypes.number,
	onCurrentIndex: PropTypes.func,
};

function NotificationItem({ notification, num, index, onCurrentIndex }) {
	// const { avatar, title } = renderContent(notification);
	const { title, avatar } = renderContent(notification);

	const handleClick = (value) => {
		if (onCurrentIndex) {
			onCurrentIndex(value);
		}
	};

	return (
		<ListItem
			button
			disableGutters
			// to="#"
			// component={RouterLink}
			sx={{
				py: 1.5,
				px: 2.5,
				mt: '1px',
				...(num && {
					bgcolor: 'action.selected',
				}),
			}}
			onClick={() => handleClick(index)}
		>
			<ListItemAvatar>
				<Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={title}
				secondary={
					<Typography
						variant="caption"
						sx={{
							mt: 0.5,
							display: 'flex',
							alignItems: 'center',
							color: 'text.disabled',
						}}
					>
						<Box
							component={Icon}
							icon={clockFill}
							sx={{ mr: 0.5, width: 16, height: 16 }}
						/>
						At {notification.createdAt}
						{/* {formatDistanceToNow(new Date(notification.createdAt))} */}
					</Typography>
				}
			/>
		</ListItem>
	);
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotificationsPopover() {
	const anchorRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [openfscreen, setOpenFscreen] = useState(false);
	const [notifications, setNotifications] = useState();
	const dispatch = useDispatch();

	// Handle cho phan alertdata
	const [alertdata, setAlertData] = useState([]);
	const [length, setLength] = useState([]);
	const [schools, setSchools] = useState([]); //setState cho alertid
	const [value, setValue] = useState([]);
	const [num, setNum] = useState(0);
	const [currentindex, setCurrentIndex] = useState(null); //Lấy index của mảng in
	const hostData = useSelector((state) => state.host);
	const ipUrl = useSelector((state) => state.ipaddress);

	// Handle hostgroup
	let hostgroup = [];
	for (let i = 0; i < hostData.length; i++) {
		hostgroup.push(hostData[i].hostid);
	}

	// Handle badge
	const ref = firebase.firestore().collection('alertdata');

	function getSchools() {
		ref.onSnapshot((querySnapshot) => {
			const items = [];
			querySnapshot.forEach((doc) => {
				items.push(doc.data());
			});
			setSchools(items);
		});
	}

	// ADD FUNCTION
	function addSchool(newSchool) {
		ref.doc(newSchool.id)
			.set(newSchool)
			.catch((err) => {
				console.error(err);
			});
	}

	//DELETE FUNCTION
	function deleteSchool(school) {
		ref.doc(school.id)
			.delete()
			.catch((err) => {
				console.error(err);
			});
	}

	//Auto get info
	useEffect(() => {
		async function AutoNotify() {
			try {
				// Setting alert data
				getSchools();
				if (hostgroup) {
					const alertData = await alertApi.post(ipUrl, hostgroup);
					setAlertData(alertData.data.result);
					setValue(alertData.data.result.length);
					dispatch(setAlertLength(alertData.data.result.length));
				} else {
					setAlertData([]);
				}

				// // Check to get
				// if (alertdata && alertdata.length > 0) {
				// 	getSchools();
				// 	setValue(alertdata.length);
				// }
			} catch (err) {
				throw err;
			}
		}
		AutoNotify();
		const timeInterval = setInterval(AutoNotify, 30000);
		return () => {
			clearInterval(timeInterval);
		};
	}, [hostData]);

	// useEffect(() => {
	// 	getSchools();
	// 	setValue(alertdata.length);
	// }, [alertdata]);

	useEffect(() => {
		if (value) {
			if (schools && schools.length > 0) {
				for (let i = 0; i < schools.length; i++) {
					if (ipUrl === schools[i].ipUrl) {
						if (value !== schools[i].value) {
							setNum(value - schools[i].value);
							// deleteSchool(schools[i]);
						} else {
							setNum(schools[i].num);
							deleteSchool(schools[i]);
						}
					}

					//---

					// if (value !== schools[i].value) {
					// 	addSchool({ ipUrl, value, id: uuidv4(), num });
					// } else {
					// 	deleteSchool(schools[i]);
					// }
				}
				addSchool({ ipUrl, value, id: uuidv4(), num });
			}
		}
	}, [value]);

	console.log('school', schools);
	console.log('number', num);
	console.log('value', value);

	//--------------------------------------------------------//
	//Xử lý subject hiển thị lên chuông
	const test = alertdata;
	let sixnews = [];
	if (test.length > 6) {
		for (let i = test.length - 1; i >= test.length - 6; i--) {
			sixnews.push(test[i].subject);
		}
	} else {
		for (let i = test.length - 1; i >= 0; i--) {
			sixnews.push(test[i].subject);
		}
	}

	let notify = [];
	if (sixnews.length > 0) {
		for (let i = 0; i < sixnews.length; i++) {
			let obj = {};
			obj['title'] = sixnews[i].slice(0, 8);
			obj['description'] = sixnews[i].slice(9, -9);
			obj['avatar'] = null;
			obj['createdAt'] = sixnews[i].slice(-8);
			notify.push(obj);
		}
	}

	// console.log('notify', notify);

	//Handle cho phần message
	let sixmessages = [];
	if (test.length > 6) {
		for (let i = test.length - 1; i >= test.length - 6; i--) {
			let obj = {};
			let a = test[i].message.split('|');
			obj['name'] = a[0];
			obj['time'] = a[1];
			obj['status'] = a[2];
			obj['severity'] = a[3];
			obj['graphic'] = a[4];
			sixmessages.push(obj);

			// sixmessages.push(test[i].message.split("|"));
		}
	} else {
		for (let i = test.length - 1; i >= 0; i--) {
			let obj = {};
			let a = test[i].message.split('|');
			obj['name'] = a[0];
			obj['time'] = a[1];
			obj['status'] = a[2];
			obj['severity'] = a[3];
			obj['graphic'] = a[4];
			sixmessages.push(obj);
		}
	}

	//Phần này test cho phần hiển thị history trước mắt 10 cái
	let allhistory = [];
	if (test && test.length > 6) {
		for (let i = test.length - 1; i >= 0; i--) {
			if (test[i].message.includes('|')) {
				let obj = {};
				let a = test[i].message.split('|');
				obj['name'] = a[0];
				obj['time'] = a[1];
				obj['status'] = a[2];
				obj['severity'] = a[3];
				obj['graphic'] = a[4];
				allhistory.push(obj);
			}

			// sixmessages.push(test[i].message.split("|"));
		}
	} else {
		for (let i = test.length - 1; i >= 0; i--) {
			if (test[i].message.includes('|')) {
				let obj = {};
				let a = test[i].message.split('|');
				obj['name'] = a[0];
				obj['time'] = a[1];
				obj['status'] = a[2];
				obj['severity'] = a[3];
				obj['graphic'] = a[4];
				allhistory.push(obj);
			}
		}
	}

	//--------------------------------------------------------//

	// const totalUnRead = notifications.filter(
	// 	(item) => item.isUnRead === true
	// ).length;

	// Gan gia tri cho totalUnRead
	const totalUnRead = num;

	const handleOpen = () => {
		setOpen(true);
	};

	const handleOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	/*Handle bật Dialog Full-screen */
	const handleClickOpenFullScreen = () => {
		setOpenFscreen(true);
	};

	const handleCloseFullScreen = () => {
		setOpenFscreen(false);
	};

	const handleMarkAllAsRead = () => {
		setNum(0);
		addSchool({ ipUrl, value, id: uuidv4(), num: '0' });
		if (schools && schools.length > 0) {
			for (let i = 0; i < schools.length; i++) {
				if (ipUrl === schools[i].ipUrl) {
					if (value !== schools[i].value) {
						deleteSchool(schools[i]);
					}
				}
			}
		}
		// setNotifications(
		// 	notifications.map((notification) => ({
		// 		...notification,
		// 		isUnRead: false,
		// 	}))
		// );
	};

	const handleCurrentIndex = (value) => {
		setCurrentIndex(value);
		handleOpenDialog();
		handleClose();
	};

	return (
		<>
			<IconButton
				ref={anchorRef}
				onClick={handleOpen}
				color={open ? 'primary' : 'default'}
				sx={{
					...(open && {
						bgcolor: (theme) =>
							alpha(
								theme.palette.primary.main,
								theme.palette.action.focusOpacity
							),
					}),
				}}
			>
				<Badge badgeContent={totalUnRead} color="error">
					<Icon icon={bellFill} width={20} height={20} />
				</Badge>
			</IconButton>

			<MenuPopover
				open={open}
				onClose={handleClose}
				anchorEl={anchorRef.current}
				sx={{ width: 360 }}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						py: 2,
						px: 2.5,
					}}
				>
					<Box sx={{ flexGrow: 1 }}>
						<Typography variant="subtitle1">
							Notifications
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: 'text.secondary' }}
						>
							You have {totalUnRead} unread messages
						</Typography>
					</Box>

					{totalUnRead > 0 && (
						<Tooltip title=" Mark all as read">
							<IconButton
								color="primary"
								onClick={() => {
									handleMarkAllAsRead();
								}}
							>
								<Icon
									icon={doneAllFill}
									width={20}
									height={20}
								/>
							</IconButton>
						</Tooltip>
					)}
				</Box>

				<Divider />

				<Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
					<List
						disablePadding
						subheader={
							num !== 0 && (
								<ListSubheader
									disableSticky
									sx={{
										py: 1,
										px: 2.5,
										typography: 'overline',
									}}
								>
									New
								</ListSubheader>
							)
						}
					>
						{notify.length > 0 &&
							notify
								.slice(0, num)
								.map((notification, index) => (
									<NotificationItem
										key={index}
										index={index}
										notification={notification}
										num={num}
										onCurrentIndex={handleCurrentIndex}
									/>
								))}
						{/* {notifications.slice(0, num).map((notification) => (
							<NotificationItem
								key={notification.id}
								notification={notification}
							/>
						))} */}
					</List>

					<List
						disablePadding
						subheader={
							<ListSubheader
								disableSticky
								sx={{ py: 1, px: 2.5, typography: 'overline' }}
							>
								Before that
							</ListSubheader>
						}
					>
						{notify.length > 0 &&
							notify
								.slice(num, 5)
								.map((notification, index) => (
									<NotificationItem
										key={index}
										index={index}
										notification={notification}
										onCurrentIndex={handleCurrentIndex}
									/>
								))}
						{/* {notifications.slice(num, 5).map((notification) => (
							<NotificationItem
								key={notification.id}
								notification={notification}
							/>
						))} */}
					</List>
				</Scrollbar>

				<Divider />

				<Box sx={{ p: 1 }}>
					<Button
						fullWidth
						disableRipple
						// component={RouterLink}
						// to="#"
						onClick={() => {
							handleClickOpenFullScreen();
							handleClose();
						}}
					>
						View All
					</Button>
				</Box>
			</MenuPopover>

			<Dialog
				open={openDialog}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => {
					handleCloseDialog();
				}}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				{currentindex != null && sixmessages.length > 0 && (
					<DialogTitle id="alert-dialog-slide-title">
						{sixmessages[currentindex].status.includes(
							'PROBLEM'
						) === true ? (
							<Alert variant="outlined" severity="error">
								<AlertTitle style={{ padding: 'none' }}>
									<Box fontSize={20}>Problem Detail</Box>
								</AlertTitle>
							</Alert>
						) : (
							<Alert variant="outlined" severity="success">
								<AlertTitle style={{ padding: 'none' }}>
									<Box fontSize={20}>Problem Detail</Box>
								</AlertTitle>
							</Alert>
						)}
					</DialogTitle>
				)}
				{/* <DialogTitle id="alert-dialog-slide-title">
					{"Problem Detail"}
				</DialogTitle> */}
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{currentindex != null && sixmessages.length > 0 && (
							<Box>
								<Box>{sixmessages[currentindex].name}</Box>
								<Box>{sixmessages[currentindex].time}</Box>
								<Box>
									<Box
										display="inline-block"
										fontWeight="fontWeightMedium"
									>
										Status:
									</Box>
									<Box display="inline-block">
										{sixmessages[
											currentindex
										].status.replace('Status:', '')}
									</Box>
								</Box>
								<Box>
									<Box
										display="inline-block"
										fontWeight="fontWeightMedium"
									>
										Severity:
									</Box>
									<Box display="inline-block">
										{sixmessages[
											currentindex
										].severity.replace('Severity:', '')}
									</Box>
								</Box>

								<Box>{sixmessages[currentindex].graphic}</Box>
							</Box>
						)}

						{/* {sixmessages.length > 0 &&
							sixmessages.map((item, index) => (
								<Box key={index}>
									<Box>{sixmessages[0].time}</Box>
								</Box>
							))} */}

						{/* {arr.map((item, index) => (
							<Box>
								<Box>{item[currentindex]}</Box>
							</Box>
						))} */}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							handleCloseDialog();
						}}
						color="primary"
						style={{ outline: 'none' }}
					>
						AGREE
					</Button>
				</DialogActions>
			</Dialog>

			{/*Full-screen */}
			<Dialog
				fullScreen
				open={openfscreen}
				onClose={handleCloseFullScreen}
				TransitionComponent={Transition}
			>
				<AppBar>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleCloseFullScreen}
							aria-label="close"
							style={{
								outline: 'none',
							}}
						>
							<Icon icon={closeCircle} />
						</IconButton>
						<Typography variant="h6">Notifications</Typography>
					</Toolbar>
				</AppBar>
				<Table size="small" style={{ marginTop: 80 }}>
					<TableHead>
						<TableRow>
							<TableCell>Index</TableCell>
							<TableCell>Trigger name</TableCell>
							<TableCell>Time</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Severity</TableCell>
							<TableCell align="right">Item Graphic</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{allhistory.length > 0 &&
							allhistory.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.time}</TableCell>
									<TableCell>
										{item.status.includes('Status:') ===
										true
											? item.status.replace('Status:', '')
											: ''}
									</TableCell>
									<TableCell>
										<Label
											variant="ghost"
											color={
												(item.severity.includes(
													'Warning'
												) === true &&
													'warning') ||
												(item.severity.includes(
													'Information'
												) === true &&
													'info') ||
												'error'
											}
										>
											{item.severity.includes(
												'Severity:'
											) === true
												? item.severity.replace(
														'Severity:',
														''
												  )
												: ''}
										</Label>
									</TableCell>
									<TableCell align="right">
										{item.graphic.includes(
											'Item Graphic:'
										) === true
											? item.graphic.replace(
													'Item Graphic:',
													''
											  )
											: ''}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</Dialog>
		</>
	);
}
