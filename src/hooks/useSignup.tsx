import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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

				updateProfile(auth.currentUser!, {
					displayName: displayName,
				}).then(() => {
					console.log("Profile updated!!");
				});

				setDoc(doc(db, "users", res.user.uid), {
					online: true,
				});

				dispatch!({ type: "LOGIN", payload: res.user });

				setIsPending(false);
			})
			.catch((err) => {
				setIsPending(false);
				setError(err.message);
			});
	};

	return { error, isPending, signup };
};
