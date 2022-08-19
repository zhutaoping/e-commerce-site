import { useState, useEffect, ReactNode, useRef } from "react";
import { db } from "../firebase/config";
import {
	collection,
	onSnapshot,
	query,
	where,
	Query,
	DocumentData,
} from "firebase/firestore";
import { ProductState, UserTypes } from "../types/myTypes";

//fix me
export const useCollectionUser = (c: string, _q?: any) => {
	const [documents, setDocuments] = useState<ProductState[] | null>(null);
	const [error, setError] = useState<ReactNode>();

	const q = useRef(_q).current; // fix my, forgot why

	useEffect(() => {
		let ref: Query<DocumentData> = collection(db, c);

		const [x, y, z] = q; //fix me
		ref = query(ref, where(x, y, z));

		const unsub = onSnapshot(
			ref,
			(snapshot) => {
				const results = snapshot.docs.map((doc) => ({
					...(doc.data() as UserTypes),
				}));
				// console.log(results);
				const temp = results[0]?.items as ProductState[];
				// console.log(temp);
				setDocuments(temp);
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
