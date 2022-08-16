import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBdZ_m8mfZVdS-RE49_hL6fnTGdQW3y9H0",
	authDomain: "ecommercesite-3693e.firebaseapp.com",
	projectId: "ecommercesite-3693e",
	storageBucket: "ecommercesite-3693e.appspot.com",
	messagingSenderId: "607507709358",
	appId: "1:607507709358:web:8c4f29f635aa960c3f9c3f",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init firestore
const db = getFirestore(app);

// init firebase auth
const auth = getAuth(); // fix me (app)

export { db, auth };
