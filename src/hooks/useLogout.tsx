import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
	const { dispatch, user } = useAuthContext();
	// const { uid } = user;
	// console.log(uid);

	const logout = () => {
		signOut(auth)
			.then(() => {
				// console.log(res);
				//@ts-ignore
				const userRef = doc(db, "users", user.uid);
				updateDoc(userRef, {
					online: false,
				});

				dispatch!({ type: "LOGOUT", payload: null });
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return { logout };
};
