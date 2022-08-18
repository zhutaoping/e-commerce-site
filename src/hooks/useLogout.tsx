import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { useAuthContext } from "./useAuthContext";

import { useNavigate } from "react-router-dom";

export const useLogout = () => {
	const { dispatch, user } = useAuthContext();

	const navigate = useNavigate();

	const logout = () => {
		signOut(auth)
			.then(() => {
				//@ts-ignore
				const userRef = doc(db, "users", user.uid); // fix me
				updateDoc(userRef, {
					online: false,
				});
				navigate("/");

				dispatch!({ type: "LOGOUT", payload: null });
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return { logout };
};
