import { useCallback, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { MdOutlineEmail } from "react-icons/md";

export default function Success() {
	const { user } = useAuthContext();

	const deleteDocCart = useCallback(async () => {
		const docRef = doc(db, "users", user!.uid);
		await updateDoc(docRef, {
			items: deleteField(),
		});
	}, [user]);

	useEffect(() => {
		if (!user) {
			localStorage.setItem("state", JSON.stringify([]));
			return;
		}
		deleteDocCart();
	}, [deleteDocCart, user]);

	return (
		<div className="success">
			<div className="container">
				<h1>Thank you</h1>
				<h6 className="">Your order was completed successfully</h6>
				<div className="email">
					<MdOutlineEmail size={50} className="icon" />
					<span>
						An email receipt including the details about your order has been
						sent. Please keep it for your records
					</span>
				</div>
			</div>
		</div>
	);
}
