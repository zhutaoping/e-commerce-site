import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { auth } from "../firebase/config";
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from "firebase/auth";
import { db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";

export const useSignup = () => {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const { dispatch } = useAuthContext();

	const signup = (email: string, password: string, displayName: string) => {
		setIsPending(true);
		setError(null);

		createUserWithEmailAndPassword(auth, email, password)
			.then((res) => {
				if (!res) {
					throw new Error("無法完成註冊");
				}
				const user = res.user;

				setDoc(doc(db, "users", user.uid), {
					online: true,
					displayName,
				});

				dispatch!({ type: "LOGIN", payload: user });
			})
			.catch((err) => {
				setIsPending(false);
				setError(err.message);
			});
	};

	return { error, isPending, signup };
};
