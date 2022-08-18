import React, {
	createContext,
	useState,
	useEffect,
	useRef,
	useReducer,
} from "react";

// import { State } from "../components/ProductList";
import { ProductState } from "../interfaces/ProductState";

import { db } from "../firebase/config";
import { doc, updateDoc, arrayUnion, deleteField } from "firebase/firestore";
import { auth } from "../firebase/config";

type Props = {
	children: React.ReactNode;
};

type CartAction =
	| { type: "INIT"; payload: ProductState[] }
	| { type: "ADD"; payload: ProductState }
	| { type: "INCREASE"; payload: ProductState }
	| { type: "DECREASE"; payload: ProductState }
	| { type: "DELETE"; payload: string };

const localCartReducer = (localCart: ProductState[], action: CartAction) => {
	const { type, payload } = action;
	switch (type) {
		case "INIT":
			return [...payload];

		case "ADD":
			if (payload.addedCount) {
				// updateFirebaseDoc(payload.id, payload.addedCount);
				payload.count = payload.addedCount;
			}
			payload.addedCount = 0;
			addDocCart(payload);
			return [...localCart, payload];

		case "INCREASE":
			let loCountIncre: number = 0;
			const tempIncre = localCart.map((lo) => {
				if (lo.id === payload.id) {
					loCountIncre = lo.count! + payload.addedCount!;
					return { ...lo, count: loCountIncre };
				} else return lo;
			});
			updateDocCart(tempIncre);
			return [...tempIncre];

		case "DECREASE":
			let loCountDecre: number = 0;
			const tempDecre = localCart.map((lo) => {
				if (lo.id === payload.id) {
					loCountDecre = lo.count! - payload.addedCount!;
					return { ...lo, count: loCountDecre };
				} else return lo;
			});
			updateDocCart(tempDecre);
			return [...tempDecre];

		case "DELETE":
			const tempDelete = localCart.filter((lo) => lo.id !== payload);
			updateDocCart(tempDelete);
			return [...tempDelete];

		default:
			return localCart;
	}
};

const addDocCart = async (item: ProductState) => {
	const userRef = doc(db, "users", auth.currentUser!.uid);

	await updateDoc(userRef, {
		items: arrayUnion(item),
	});
};

const updateDocCart = async (items: ProductState[]) => {
	const userRef = doc(db, "users", auth.currentUser!.uid);

	await updateDoc(userRef, {
		items: deleteField(),
	});

	await updateDoc(userRef, {
		items: arrayUnion(...items),
	});
};

type Context = {
	localCart: ProductState[];
	dispatch: React.Dispatch<CartAction>;
};

export const ProductContext = createContext<Context>({
	localCart: [],
	dispatch: () => null,
});

export const ProductContextProvider = ({ children }: Props) => {
	const [cartItems, setCartItems] = useState<ProductState[]>([]);
	const [localCart, dispatch] = useReducer(localCartReducer, []);

	const initRender = useRef(true);

	useEffect(() => {
		const currLocalCart = localStorage.getItem("localCart");

		if (currLocalCart) {
			const arr: ProductState[] = JSON.parse(currLocalCart!);
			dispatch({ type: "INIT", payload: arr });
		} else {
			console.log("empty localCart");
			return;
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
