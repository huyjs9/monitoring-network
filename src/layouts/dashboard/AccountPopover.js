import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { alpha } from '@material-ui/core/styles';
import {
	Button,
	Box,
	Divider,
	MenuItem,
	Typography,
	Avatar,
	IconButton,
} from '@material-ui/core';
// components
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';
import firebase from 'src/firebase';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
	// {
	// 	label: 'Zabbix Home',
	// 	icon: homeFill,
	// 	linkTo: '/',
	// },
	// {
	// 	label: "Profile",
	// 	icon: personFill,
	// 	linkTo: "#",
	// },
	{
		label: 'Settings',
		icon: settings2Fill,
		linkTo: '#',
	},
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
	const anchorRef = useRef(null);
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [direct, setDirect] = useState([]);
	const [target, setTarget] = useState([]);
	const ipUrl = useSelector((state) => state.ipaddress);

	const getCurrentUsername = () => {
		return firebase.auth().currentUser && firebase.auth().currentUser.email;
	};

	const handleOpen = () => {
		setOpen(true);
		if (ipUrl.length > 0) {
			setDirect(`http://${ipUrl}/zabbix`);
			setTarget('_blank');
		} else {
			setDirect('/');
			setTarget('');
		}
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<IconButton
				ref={anchorRef}
				onClick={handleOpen}
				sx={{
					padding: 0,
					width: 44,
					height: 44,
					...(open && {
						'&:before': {
							zIndex: 1,
							content: "''",
							width: '100%',
							height: '100%',
							borderRadius: '50%',
							position: 'absolute',
							bgcolor: (theme) =>
								alpha(theme.palette.grey[900], 0.72),
						},
					}),
				}}
			>
				<Avatar src={account.photoURL} alt="photoURL" />
			</IconButton>

			<MenuPopover
				open={open}
				onClose={handleClose}
				anchorEl={anchorRef.current}
				sx={{ width: 220 }}
			>
				<Box sx={{ my: 1.5, px: 2.5 }}>
					<Typography variant="subtitle1" noWrap>
						Admin
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: 'text.secondary' }}
						noWrap
					>
						{getCurrentUsername()}
					</Typography>
				</Box>

				<Divider sx={{ my: 1 }} />

				<MenuItem
					href={direct}
					target={target}
					component={Button}
					onClick={handleClose}
					sx={{ typography: 'body2', py: 1, px: 2.5 }}
				>
					<Box
						component={Icon}
						icon={homeFill}
						sx={{
							mr: 2,
							width: 24,
							height: 24,
						}}
					/>
					<Box style={{ textDecoration: 'none', color: 'black' }}>
						Zabbix Home
					</Box>
				</MenuItem>

				{MENU_OPTIONS.map((option) => (
					<MenuItem
						key={option.label}
						to={option.linkTo}
						component={RouterLink}
						onClick={handleClose}
						sx={{ typography: 'body2', py: 1, px: 2.5 }}
					>
						<Box
							component={Icon}
							icon={option.icon}
							sx={{
								mr: 2,
								width: 24,
								height: 24,
							}}
						/>

						{option.label}
					</MenuItem>
				))}

				<Box sx={{ p: 2, pt: 1.5 }}>
					<Button
						fullWidth
						color="inherit"
						variant="outlined"
						onClick={() => {
							handleClose();
							logout();
						}}
					>
						Logout
					</Button>
				</Box>
			</MenuPopover>
		</>
	);
	async function logout() {
		await firebase.auth().signOut();
		navigate('/login', { replace: true });
		localStorage.removeItem('tokenFirebase');
	}
}
