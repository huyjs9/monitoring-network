import firebase from 'src/firebase';

const getFirebaseToken = async () => {
	const currentUser = firebase.auth().currentUser;
	if (currentUser) return currentUser.getIdToken();

	//Not logged in
	const hasRememberdAccount = localStorage.getItem('tokenFirebase');
	if (!hasRememberdAccount) return null;

	//Logged in but current user is not fetched --> wait 10s
	return new Promise((resolve, reject) => {
		const waitTimer = setTimeout(() => {
			reject(null);
			console.log('Reject Timeout');
		}, 10000);

		const unregisterAuthObserver = firebase
			.auth()
			.onAuthStateChanged(async (user) => {
				if (!user) {
					reject(null);
				}
				const token = await user.getIdToken();
				localStorage.setItem('tokenFirebase', token);
				console.log('Logged in user token', token);
				resolve(token);
			});

		unregisterAuthObserver();
		clearTimeout(waitTimer);
	});
};

export default getFirebaseToken;
