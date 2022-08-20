import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { useAuthContext } from "./useAuthContext";

import { useNavigate } from "react-router-dom";
import { useProductContext } from "./useProductContext";

export const useLogout = () => {
	const { dispatch, user } = useAuthContext();
	const { dispatch: dis } = useProductContext();

	const navigate = useNavigate();

	const userId = auth.currentUser ? auth.currentUser.uid : "";

	const logout = () => {
		signOut(auth)
			.then(() => {
				if (user) {
					const userRef = doc(db, "users", userId);
					updateDoc(userRef, {
						online: false,
					});
				}

				navigate("/");
				dis!({ type: "INIT", payload: [] });
				dispatch!({ type: "LOGOUT", payload: null });
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return { logout };
};
