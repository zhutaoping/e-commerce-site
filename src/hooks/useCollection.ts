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
import { ProductTypes } from "../types/myTypes";

export const useCollection = (
	c: string,
	_q?: [string, WhereFilterOp, string]
) => {
	const [documents, setDocuments] = useState<ProductTypes[] | null>(null);
	const [error, setError] = useState<ReactNode>();

	const q = useRef(_q).current;

	useEffect(() => {
		let ref: Query<DocumentData> = collection(db, c);

		if (q) {
			ref = query(ref, where(...q));
		}

		const unsubscribe = onSnapshot(
			ref,
			(snapshot) => {
				const results = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setDocuments(results);
				setError(null);
			},
			(error) => {
				setError(error.code);
			}
		);
		return () => unsubscribe();
	}, [c, q]);

	return { documents, error };
};
