import React, {
	createContext,
	useState,
	useEffect,
	useRef,
	useReducer,
} from "react";
import { State } from "../components/ProductList";

import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

type Props = {
	children: React.ReactNode;
};

// interface ExtendedState extends State {
// 	addedCount?: number;
// }

type CartAction =
	| { type: "INIT"; payload: State[] }
	| { type: "ADD"; payload: State }
	| { type: "INCREASE"; payload: State }
	| { type: "DECREASE"; payload: State }
	| { type: "DELETE"; payload: string };

const localCartReducer = (localCart: State[], action: CartAction) => {
	const { type, payload } = action;
	switch (type) {
		case "INIT":
			return [...payload];

		case "ADD":
			if (payload.addedCount) {
				updateFirebaseDoc(payload.id, payload.addedCount);
				payload.count = payload.addedCount;
			}
			// payload.addedCount = 0;
			return [...localCart, payload];

		case "INCREASE":
			let loCountIncre: number = 0;
			const tempIncre = localCart.map((lo) => {
				if (lo.id === payload.id) {
					loCountIncre = lo.count! + payload.addedCount!;
					return { ...lo, count: loCountIncre };
				} else return lo;
			});
			updateFirebaseDoc(payload.id, loCountIncre);
			return [...tempIncre];

		case "DECREASE":
			let loCountDecre: number = 0;
			const tempDecre = localCart.map((lo) => {
				if (lo.id === payload.id) {
					loCountDecre = lo.count! - payload.addedCount!;
					return { ...lo, count: loCountDecre };
				} else return lo;
			});
			updateFirebaseDoc(payload.id, loCountDecre);
			return [...tempDecre];

		case "DELETE":
			updateFirebaseDoc(payload, 0);
			const tempDelete = localCart.filter((lo) => lo.id !== payload);
			return [...tempDelete];

		default:
			return localCart;
	}
};

const updateFirebaseDoc = async (id: string, loCount: number) => {
	const productRef = doc(db, "products", id);
	await updateDoc(productRef, {
		count: loCount,
	});
};

type Context = {
	localCart: State[];
	dispatch: React.Dispatch<CartAction>;
};

export const ProductContext = createContext<Context>({
	localCart: [],
	dispatch: () => null,
});

export const ProductContextProvider = ({ children }: Props) => {
	const [cartItems, setCartItems] = useState<State[]>([]);
	const [localCart, dispatch] = useReducer(localCartReducer, []);

	const initRender = useRef(true);

	useEffect(() => {
		const currLocalCart = localStorage.getItem("localCart");

		if (currLocalCart) {
			const arr: State[] = JSON.parse(currLocalCart!);
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
