import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDQncqHk-N8Ew7UdpmldDX1-Gcn2tWTO5g',
	authDomain: 'bar-tracker-fb9ec.firebaseapp.com',
	projectId: 'bar-tracker-fb9ec',
	storageBucket: 'bar-tracker-fb9ec.appspot.com',
	messagingSenderId: '563066220799',
	appId: '1:563066220799:web:e1a8c67460213f74845cca',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
