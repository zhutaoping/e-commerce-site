import React, { createContext, useEffect, useRef, useReducer } from "react";
import { ProductTypes } from "../types/myTypes";

import { db, auth } from "../firebase/config";
import { doc, updateDoc, arrayUnion, deleteField } from "firebase/firestore";
import { useAuthContext } from "../hooks/useAuthContext";

type Props = {
	children: React.ReactNode;
};

type CartAction =
	| { type: "INIT"; payload: ProductTypes[] }
	| { type: "ADD"; payload: ProductTypes }
	| { type: "INCREASE"; payload: ProductTypes }
	| { type: "DECREASE"; payload: ProductTypes }
	| { type: "DELETE"; payload: string };

const localCartReducer = (localCart: ProductTypes[], action: CartAction) => {
	const { type, payload } = action;
	switch (type) {
		case "INIT":
			return [...payload];

		case "ADD":
			if (payload.addedCount) {
				payload.count = payload.addedCount;
			}
			payload.addedCount = 0;

			auth.currentUser && addDocCart(payload);
			return [...localCart, payload];

		case "INCREASE":
			let loCountIncre: number = 0;
			const tempIncre = localCart.map((lo) => {
				if (lo.id === payload.id) {
					loCountIncre = lo.count! + payload.addedCount!;
					return { ...lo, count: loCountIncre };
				} else return lo;
			});
			auth.currentUser && updateDocCart(tempIncre);
			return [...tempIncre];

		case "DECREASE":
			let loCountDecre: number = 0;
			const tempDecre = localCart.map((lo) => {
				if (lo.id === payload.id) {
					loCountDecre = lo.count! - payload.addedCount!;
					return { ...lo, count: loCountDecre };
				} else return lo;
			});
			auth.currentUser && updateDocCart(tempDecre);
			return [...tempDecre];

		case "DELETE":
			const tempDelete = localCart.filter((lo) => lo.id !== payload);
			auth.currentUser && updateDocCart(tempDelete);
			return [...tempDelete];

		default:
			return localCart;
	}
};

const addDocCart = async (item: ProductTypes) => {
	const uid = auth.currentUser ? auth.currentUser.uid : "";
	const userRef = doc(db, "users", uid);

	await updateDoc(userRef, {
		items: arrayUnion(item),
	});
};

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

interface Context {
	localCart: ProductTypes[];
	dispatch: React.Dispatch<CartAction>;
}

export const ProductContext = createContext<Context>({
	localCart: [],
	dispatch: () => null,
});

export const ProductContextProvider = ({ children }: Props) => {
	const [localCart, dispatch] = useReducer(localCartReducer, []);

	const initRender = useRef(true);

	const { user } = useAuthContext();

	useEffect(() => {
		if (user) return;

		const currLocalCart = localStorage.getItem("localCart");

		if (currLocalCart) {
			const arr: ProductTypes[] = JSON.parse(currLocalCart!);
			dispatch({ type: "INIT", payload: arr });
		}
	}, []);

	useEffect(() => {
		if (initRender.current) {
			initRender.current = false;
			return;
		}
		const json = JSON.stringify(localCart);
		localStorage.setItem("localCart", json);
	}, [localCart]);

	const value = { localCart, dispatch };

	return (
		<ProductContext.Provider value={value}>{children}</ProductContext.Provider>
	);
};
