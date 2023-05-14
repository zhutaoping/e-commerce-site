import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useProduct } from "../products/ProductContext";
import { useAuth } from "../auth/AuthContext";

export const useLogout = () => {
	const { dispatch: dispatchProduct } = useProduct();
	const { dispatch } = useAuth();
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
				dispatch!({ type: "LOGOUT" });

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
