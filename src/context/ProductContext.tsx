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
	| { type: "DECREASE"; payload: number }
	| { type: "REMOVE"; payload: string };

const localCartReducer = (localCart: State[], action: CartAction) => {
	const { type, payload } = action;
	switch (type) {
		case "INIT":
			return [...localCart, ...payload];
		case "ADD":
			return [...localCart, payload];
		case "INCREASE":
			// console.log("test increase");
			let loCount: number = 0;
			localCart.map((lo) => {
				if (lo.id === payload.id) {
					loCount = lo.count! + payload.addedCount!;
					return (lo.count = loCount);
				}
				return loCount;
			});
			updateDocument(payload.id, loCount);
			return [...localCart];
		case "DECREASE":
			return localCart;
		default:
			return localCart;
	}
};

const updateDocument = async (id: string, ct: number) => {
	console.log("update");
	const productRef = doc(db, "products", "id");
	await updateDoc(productRef, {
		count: ct,
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
		console.log(localCart);
	}, [localCart]);

	const value = { localCart, dispatch };

	return (
		<ProductContext.Provider value={value}>{children}</ProductContext.Provider>
	);
};
