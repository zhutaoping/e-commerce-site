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
			return [...localCart, ...payload];
		case "ADD":
			console.log("test add");
			updateDocument(payload.id, 1);
			return [...localCart, payload];
		case "INCREASE":
			console.log("test increase");

			let loCountIncre: number = 0;
			const tempIncre = localCart.map((lo) => {
				if (lo.id === payload.id) {
					loCountIncre = lo.count! + payload.addedCount!;
					lo.count = loCountIncre;
				}
				return lo;
			});
			console.log(tempIncre);
			updateDocument(payload.id, loCountIncre);
			return [...tempIncre];
		case "DECREASE":
			console.log("test decrease");

			let loCountDecre: number = 0;
			const tempDecre = localCart.map((lo) => {
				if (lo.id === payload.id) {
					loCountDecre = lo.count! - payload.addedCount!;
					lo.count = loCountDecre;
				}
				return lo;
			});
			console.log(tempDecre);
			updateDocument(payload.id, loCountDecre);
			return [...tempDecre];
		case "DELETE":
			console.log("test delete", payload);
			updateDocument(payload, 0);
			const tempDelete = localCart.filter((lo) => lo.id !== payload);
			return [...tempDelete];
		default:
			return localCart;
	}
};

const updateDocument = async (id: string, loCount: number) => {
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
		} else return;
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
