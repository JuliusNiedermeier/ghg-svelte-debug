import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyA_Sf-xBwjkYoTYHQ4IVeLV10q5kHiS04c',
	authDomain: 'ghg-data-tool.firebaseapp.com',
	projectId: 'ghg-data-tool',
	storageBucket: 'ghg-data-tool.appspot.com',
	messagingSenderId: '276140088806',
	appId: '1:276140088806:web:40e181b61d0a1d22cf4a27'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
