import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from "react";
import { auth } from "../firebase/config";
import { ProductTypes } from "../types/myTypes";
import { useAuth } from "../auth/AuthContext";
import addDocCart from "./useAddDocCart";
import updateDocCart from "./useUpdateDocCart";

//* REDUCER
type Action =
	| { type: "INIT"; payload: ProductTypes[] }
	| { type: "ADD"; payload: ProductTypes }
	| { type: "INCREASE"; payload: ProductTypes }
	| { type: "DECREASE"; payload: ProductTypes }
	| { type: "DELETE"; payload: string };

const stateReducer = (state: ProductTypes[], action: Action) => {
	const { type, payload } = action;

	const updateLocalStorage = (newState: ProductTypes[]) => {
		const json = JSON.stringify(newState);
		localStorage.setItem("state", json);
	};

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

//* CONTEXT
interface ProductContextType {
	state: ProductTypes[];
	dispatch: React.Dispatch<Action>;
}

export const ProductContext = createContext<ProductContextType>(
	{} as ProductContextType
);

export const ProductContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [state, dispatch] = useReducer(stateReducer, []);
	const { user } = useAuth();

	useEffect(() => {
		if (user) return;

		const currState = localStorage.getItem("state");
		if (currState) {
			const arr: ProductTypes[] = JSON.parse(currState);
			dispatch({ type: "INIT", payload: arr });
		}
	}, [user]);

	return (
		<ProductContext.Provider value={{ state, dispatch }}>
			{children}
		</ProductContext.Provider>
	);
};

export const useProduct = () => useContext(ProductContext);
