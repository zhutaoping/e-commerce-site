import { useState, useEffect, ReactNode, useRef } from "react";
import { db } from "../firebase/config";
import {
	collection,
	onSnapshot,
	query,
	where,
	WhereFilterOp,
	DocumentData,
	Query,
} from "firebase/firestore";
import { ProductState } from "../types/myTypes";

export const useCollection = (
	c: string,
	_q?: [string, WhereFilterOp, string]
) => {
	const [documents, setDocuments] = useState<ProductState[] | null>(null);
	const [error, setError] = useState<ReactNode>();

	const q = useRef(_q).current;

	useEffect(() => {
		let ref: Query<DocumentData> = collection(db, c);

		if (q) {
			ref = query(ref, where(...q));
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
				setError("err.code");
			}
		);

		return () => unsub();
	}, [c]);

	return { documents, error };
};
