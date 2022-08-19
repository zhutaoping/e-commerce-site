import { useState, useEffect, ReactNode, useRef } from "react";
import { ProductState, UserTypes } from "../types/myTypes";

import { db } from "../firebase/config";
import {
	collection,
	onSnapshot,
	query,
	where,
	Query,
	DocumentData,
	WhereFilterOp,
} from "firebase/firestore";

export const useCollectionUser = (
	c: string,
	_q?: [string, WhereFilterOp, boolean]
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
					...(doc.data() as UserTypes),
				}));
				const temp = results[0]?.items as ProductState[];
				setDocuments(temp);
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
