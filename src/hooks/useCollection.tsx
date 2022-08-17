import { useState, useEffect, ReactNode, useRef } from "react";
import { db } from "../firebase/config";
import {
	collection,
	CollectionReference,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { State } from "../components/ProductList";

export const useCollection = (c: string, _q?: string[]) => {
	const [documents, setDocuments] = useState<State[]>();
	const [error, setError] = useState<ReactNode>();

	const q = useRef(_q).current;

	useEffect(() => {
		let ref: CollectionReference = collection(db, c);

		if (q) {
			//@ts-ignore
			ref = query(ref, where(...q));
			console.log(ref);
		}

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
