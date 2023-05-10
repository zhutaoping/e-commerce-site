import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from "react";
import { auth } from "../firebase/config";
import { ProductTypes } from "../types/myTypes";
import addDocCart from "../hooks/useAddDocCart";
import updateDocCart from "../hooks/useUpdateDocCart";
import { useAuthContext } from "./AuthContext";

//* Reducer
type Action =
	| { type: "INIT"; payload: ProductTypes[] }
	| { type: "ADD"; payload: ProductTypes }
	| { type: "INCREASE"; payload: ProductTypes }
	| { type: "DECREASE"; payload: ProductTypes }
	| { type: "DELETE"; payload: string };

const updateLocalStorage = (state: ProductTypes[]) => {
	const json = JSON.stringify(state);
	localStorage.setItem("state", json);
};

const stateReducer = (state: ProductTypes[], action: Action) => {
	const { type, payload } = action;

	switch (type) {
		case "INIT":
			return [...payload];

		case "ADD":
			if (payload.addedCount) {
				payload.count = payload.addedCount;
			}
			payload.addedCount = 0;

			const newState = [...state, payload];
			if (auth.currentUser) {
				addDocCart(payload);
			} else {
				updateLocalStorage(newState);
			}
			return newState;

		case "INCREASE":
			let localCountIncre: number = 0;
			const increState = state.map((lo) => {
				if (lo.id === payload.id) {
					localCountIncre = lo.count! + payload.addedCount!;
					return { ...lo, count: localCountIncre };
				} else return lo;
			});

			if (auth.currentUser) {
				updateDocCart(increState);
			} else {
				updateLocalStorage(increState);
			}
			return [...increState];

		case "DECREASE":
			let localCountDecre: number = 0;
			const decreState = state.map((lo) => {
				if (lo.id === payload.id) {
					localCountDecre = lo.count! - payload.addedCount!;
					return { ...lo, count: localCountDecre };
				} else return lo;
			});

			if (auth.currentUser) {
				updateDocCart(decreState);
			} else {
				updateLocalStorage(decreState);
			}
			return [...decreState];

		case "DELETE":
			const tempDelete = state.filter((lo) => lo.id !== payload);

			if (auth.currentUser) {
				updateDocCart(tempDelete);
			} else {
				updateLocalStorage(tempDelete);
			}
			return [...tempDelete];

		default:
			return state;
	}
};

//* Context
interface ProductContextType {
	state: ProductTypes[];
	dispatch: React.Dispatch<Action>;
}

export const ProductContext = createContext<ProductContextType>({
	state: [],
	dispatch: () => null,
});

export const ProductContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [state, dispatch] = useReducer(stateReducer, []);
	const { user } = useAuthContext();

	useEffect(() => {
		if (user) return;

		const currState = localStorage.getItem("state");
		if (currState) {
			const arr: ProductTypes[] = JSON.parse(currState);
			dispatch({ type: "INIT", payload: arr });
		}
	}, [user]);

	const value = { state, dispatch };

	return (
		<ProductContext.Provider value={value}>{children}</ProductContext.Provider>
	);
};

export const useProductContext = () => {
	const context = useContext(ProductContext);

	if (!context) {
		throw Error("useAuthContext must be used inside an AuthContextProvider");
	}

	return context;
};
