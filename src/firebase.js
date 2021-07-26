import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBFyR3VvKraf0iJI7o3Ui6bCl-dN7UZ9cg',
	authDomain: 'monitor-app-7a3ac.firebaseapp.com',
	projectId: 'monitor-app-7a3ac',
	storageBucket: 'monitor-app-7a3ac.appspot.com',
	messagingSenderId: '516900444962',
	appId: '1:516900444962:web:5cb7ff64a9fe867e53a37b',
	measurementId: 'G-529WG4G35C',
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
