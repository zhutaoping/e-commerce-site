import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import {
	createUserWithEmailAndPassword,
	updateProfile,
	getAuth,
} from "firebase/auth";
import { db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";

export const useSignup = () => {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const { dispatch } = useAuthContext();

	const signup = async (
		email: string,
		password: string,
		displayName: string
	) => {
		setIsPending(true);
		setError(null);

		try {
			const auth = getAuth();

			const res = await createUserWithEmailAndPassword(auth, email, password);

			if (!res) {
				throw new Error("無法完成註冊");
			}

			await updateProfile(auth.currentUser!, {
				displayName: displayName,
			});

			await setDoc(doc(db, "users", res.user.uid), {
				online: true,
				items: [],
				displayName: displayName,
			});

			dispatch!({ type: "LOGIN", payload: res.user });

			setIsPending(false);
		} catch (err: any) {
			setIsPending(false);
			setError(err.code);
		}
	};

	return { error, isPending, signup };
};
