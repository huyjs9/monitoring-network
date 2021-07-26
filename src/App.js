/* eslint-disable react-hooks/exhaustive-deps */
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { useEffect } from 'react';
import firebase from 'src/firebase';
import { setUser } from './app/userSlice';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

export default function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const unregisterAuthObserver = firebase
			.auth()
			.onAuthStateChanged(async (user) => {
				if (!user) {
					console.log('Failed to login');
					return;
				}
				const token = await user.getIdToken();
				dispatch(setUser(token));
				localStorage.setItem('tokenFirebase', token);
			});
		return () => unregisterAuthObserver();
	}, []);

	return (
		<ThemeConfig>
			<ScrollToTop />
			<Router />
		</ThemeConfig>
	);
}
