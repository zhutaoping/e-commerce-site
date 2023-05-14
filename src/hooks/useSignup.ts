import { useState } from "react";

import {
	createUserWithEmailAndPassword,
	updateProfile,
	// getAuth,
} from "firebase/auth";
import { db, auth } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "../auth/AuthContext";
import { useProduct } from "../products/ProductContext";

export const useSignup = () => {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const { dispatch } = useAuth();
	const { dispatch: dispatchProduct } = useProduct();

	const signup = async (
		email: string,
		password: string,
		displayName: string
	) => {
		setIsPending(true);
		setError(null);

		try {
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

			dispatchProduct({ type: "INIT", payload: [] });
			dispatch!({ type: "LOGIN", payload: res.user });

			setIsPending(false);
		} catch (err: any) {
			setIsPending(false);
			setError(err.code);
		}
	};
	return { error, isPending, signup };
};
