import { Link as RouterLink, Outlet } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Logo from '../components/Logo';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
	top: 0,
	left: 0,
	lineHeight: 0,
	width: '100%',
	position: 'absolute',
	padding: theme.spacing(3, 3, 0),
	[theme.breakpoints.up('sm')]: {
		padding: theme.spacing(5, 5, 0),
	},
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
	const user = localStorage.getItem('tokenFirebase');
	return (
		<>
			<HeaderStyle>
				{user ? (
					<RouterLink to="/dashboard">
						<Logo />
					</RouterLink>
				) : (
					<RouterLink exact to="protected">
						<Logo />
					</RouterLink>
				)}
				{/* <RouterLink to="/">
					<Logo />
				</RouterLink> */}
			</HeaderStyle>
			<Outlet />
		</>
	);
}
