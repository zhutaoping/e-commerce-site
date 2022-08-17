import { useState } from "react";

import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const { dispatch } = useAuthContext();

	const login = (email: string, password: string) => {
		setError(null);
		setIsPending(true);

		signInWithEmailAndPassword(auth, email, password)
			.then((res) => {
				updateDoc(doc(db, "users", res.user.uid), {
					online: true,
				});

				dispatch!({ type: "LOGIN", payload: res.user });
				setIsPending(false);
			})
			.catch((err) => {
				setError(err.code);
				setIsPending(false);
			});
	};

	return { error, isPending, login };
};
