import { useState, useEffect, ReactNode } from "react";
import { db } from "../firebase/config";
import {
	collection,
	CollectionReference,
	onSnapshot,
} from "firebase/firestore";
import { State } from "../components/ProductList";

export const useCollection = (c: string) => {
	const [documents, setDocuments] = useState<State[]>();
	const [error, setError] = useState<ReactNode>();

	useEffect(() => {
		let ref: CollectionReference = collection(db, c);

		const unsub = onSnapshot(
			ref,
			(snapshot) => {
				const results = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setDocuments(results);
				setError(null);
			},
			(err) => {
				setError("無法取得資料");
			}
		);

		return () => unsub();
	}, [c]);

	return { documents, error };
};
