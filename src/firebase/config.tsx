import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: process.env.REACT_APP_AUTHDOMAIN,
	projectId: process.env.REACT_APP_PROJECTID,
	storageBucket: process.env.REACT_APP_STOREBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_APPID,
	experimentalForceLongPolling: true,
};
// init firebase
const app = initializeApp(firebaseConfig);

// init firestore
const db = getFirestore(app);

// init firebase auth
const auth = getAuth(); // fix me or not? (app)

export { db, auth };
