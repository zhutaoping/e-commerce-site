import { useCollection } from "../hooks/useCollection";
import React, {
	createContext,
	useState,
	useEffect,
	useRef,
	useReducer,
} from "react";
import { State } from "../components/ProductList";

type Props = {
	children: React.ReactNode;
};

type Context = {
	// cartItems?: State[];
	// setLocalCart?: React.Dispatch<React.SetStateAction<State[]>>;
	localCart?: State[];
	dispatch?: React.Dispatch<CartAction>;
};

type CartAction =
	| { type: "INIT"; payload: State[] }
	| { type: "ADD"; payload: State }
	| { type: "INCREASE"; payload: string }
	| { type: "DECREASE"; payload: string }
	| { type: "REMOVE"; payload: string };

const localCartReducer = (localCart: State[], action: CartAction) => {
	const { type, payload } = action;
	switch (type) {
		case "INIT":
			return [...localCart, ...payload];
		case "ADD":
			return [...localCart, payload];
		case "INCREASE":
			return localCart;
		case "DECREASE":
			return localCart;
		default:
			return localCart;
	}
};

export const ProductContext = createContext<Context>({});

export const ProductContextProvider = ({ children }: Props) => {
	const [cartItems, setCartItems] = useState<State[]>([]);
	const [localCart, dispatch] = useReducer(localCartReducer, []);

	const initRender = useRef(true);

	useEffect(() => {
		const currLocalCart = localStorage.getItem("localCart");
		if (currLocalCart) {
			const obj: State[] = JSON.parse(currLocalCart!);
			dispatch({ type: "INIT", payload: obj });
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
