import { arrayUnion, deleteField, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { ProductTypes } from "../types/myTypes";

const updateDocCart = async (items: ProductTypes[]) => {
	let uid: string = "";
	if (auth.currentUser) {
		uid = auth.currentUser.uid;
	}

	const userRef = doc(db, `users/${uid}`);
	await updateDoc(userRef, {
		items: deleteField(),
	});

	await updateDoc(userRef, {
		items: arrayUnion(...items),
	});
};
export default updateDocCart;
