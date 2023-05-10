import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Success() {
	const { user } = useAuthContext();

	const deleteDocCart = async () => {
		const docRef = doc(db, "users", user!.uid);
		await updateDoc(docRef, {
			items: deleteField(),
		});
	};

	useEffect(() => {
		console.log("HERRRREE");
		if (!user) {
			// Clear the local cart
			localStorage.setItem("state", JSON.stringify([]));
		}
		deleteDocCart();
	}, [user]);

	return <h1>Thank you for your purchase!</h1>;
}
