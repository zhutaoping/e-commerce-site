import { createContext, useReducer, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

interface State {
	user: {} | null;
	authIsReady: boolean;
	dispatch?: React.Dispatch<Action>;
}

export const AuthContext = createContext<State | null>(null);

type Action =
	| { type: "LOGIN"; payload: {} | null }
	| { type: "LOGOUT" }
	| { type: "AUTH_IS_READY"; payload: {} | null };

export const authReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
		case "AUTH_IS_READY":
			return { user: action.payload, authIsReady: true };
		default:
			return state;
	}
};

type Props = {
	children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: {},
		authIsReady: false,
	});

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			dispatch({ type: "AUTH_IS_READY", payload: user });
			unsub();
		});
	}, []);

	console.log("AuthContext state:", state);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
