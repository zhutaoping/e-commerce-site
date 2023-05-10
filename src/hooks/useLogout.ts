import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useProductContext } from "../context/ProductContext";
import { useAuthContext } from "../context/AuthContext";

export const useLogout = () => {
	const { dispatch: dispatchProduct } = useProductContext();
	const { dispatch } = useAuthContext();
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const logout = async () => {
		setIsPending(true);
		setError(null);

		const uid = auth.currentUser ? auth.currentUser.uid : "";
		const userRef = doc(db, "users", uid);

		await updateDoc(userRef, {
			online: false,
		});

		signOut(auth)
			.then(() => {
				navigate("/");
				dispatchProduct({ type: "INIT", payload: [] });
				dispatch!({ type: "LOGOUT", payload: null });

				setIsPending(false);
				setError(null);
			})
			.catch((err) => {
				setIsPending(false);
				setError(err.code);
			});
	};

	return { logout, isPending, error };
};
