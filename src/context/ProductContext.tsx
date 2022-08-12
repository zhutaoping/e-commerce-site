import { createContext, useState, useEffect, useRef } from "react";
import { useCollection } from "../hooks/useCollection";
import { State } from "../components/ProductList";

type Props = {
	children: React.ReactNode;
};

type Context = {
	cartItems?: State[];
	localCart?: State[];
	setLocalCart?: React.Dispatch<React.SetStateAction<State[]>>;
};

export const ProductContext = createContext<Context>({});

export const ProductContextProvider = ({ children }: Props) => {
	const [cartItems, setCartItems] = useState<State[]>([]);
	const [localCart, setLocalCart] = useState<State[]>([]);
	// const { documents, error } = useCollection("products");

	const initRender = useRef(true);

	const handleLocalCart = (product: State) => {
		if (localCart.some((p) => p.id === product.id)) {
			console.log("return");
			return;
		}
		setLocalCart((prev) => [...prev, product]);
	};

	useEffect(() => {
		const currLocalCart = localStorage.getItem("localCart");
		const results = JSON.parse(currLocalCart!);
		setLocalCart(results);
	}, []);

	useEffect(() => {
		if (initRender.current) {
			initRender.current = false;
			return;
		}
		const json = JSON.stringify(localCart);
		localStorage.setItem("localCart", json);
	}, [localCart]);

	const value = { localCart, setLocalCart, handleLocalCart };

	return (
		<ProductContext.Provider value={value}>{children}</ProductContext.Provider>
	);
};
