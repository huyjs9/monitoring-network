import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import {
	Box,
	Link,
	Button,
	Drawer,
	Typography,
	Avatar,
	Stack,
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import ipNetwork from '@iconify-icons/mdi/ip-network';

// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import account from '../../_mocks_/account';
import { size } from 'lodash';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
	[theme.breakpoints.up('lg')]: {
		flexShrink: 0,
		width: DRAWER_WIDTH,
	},
}));
const AccountStyle = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(2, 2.5),
	borderRadius: theme.shape.borderRadiusSm,
	backgroundColor: theme.palette.grey[200],
}));
const IconWrapperStyle = styled('div')(({ theme }) => ({
	// margin: 'auto',
	display: 'flex',
	borderRadius: '50%',
	alignItems: 'center',
	width: theme.spacing(6),
	height: theme.spacing(6),
	justifyContent: 'center',
	// marginBottom: theme.spacing(3),
	color: theme.palette.primary.dark,
	backgroundImage: `linear-gradient(135deg, ${alpha(
		theme.palette.primary.dark,
		0
	)} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));
// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
	isOpenSidebar: PropTypes.bool,
	onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
	const ipUrl = useSelector((state) => state.ipaddress);
	const { pathname } = useLocation();

	useEffect(() => {
		if (isOpenSidebar) {
			onCloseSidebar();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const renderContent = (
		<Scrollbar
			sx={{
				height: '100%',
				'& .simplebar-content': {
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
				},
			}}
		>
			<Box sx={{ px: 2.5, py: 3 }}>
				<Box
					component={RouterLink}
					to="/dashboard"
					sx={{ display: 'inline-flex' }}
				>
					<Logo />
				</Box>
			</Box>

			<Box sx={{ mb: 5, mx: 2.5 }}>
				<AccountStyle>
					<IconWrapperStyle>
						<Icon
							icon={ipNetwork}
							style={{ height: '2rem', width: '2rem' }}
						/>
					</IconWrapperStyle>

					<Box sx={{ ml: 2 }}>
						<Typography
							variant="subtitle2"
							sx={{ color: 'text.primary' }}
						>
							{ipUrl}
						</Typography>
					</Box>
				</AccountStyle>
			</Box>

			<NavSection navConfig={sidebarConfig} />

			<Box sx={{ flexGrow: 1 }} />
		</Scrollbar>
	);

	return (
		<RootStyle>
			<MHidden width="lgUp">
				<Drawer
					open={isOpenSidebar}
					onClose={onCloseSidebar}
					PaperProps={{
						sx: { width: DRAWER_WIDTH },
					}}
				>
					{renderContent}
				</Drawer>
			</MHidden>

			<MHidden width="lgDown">
				<Drawer
					open
					variant="persistent"
					PaperProps={{
						sx: {
							width: DRAWER_WIDTH,
							bgcolor: 'background.default',
						},
					}}
				>
					{renderContent}
				</Drawer>
			</MHidden>
		</RootStyle>
	);
}
