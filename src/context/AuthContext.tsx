import { createContext, useReducer, useEffect } from "react";

import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

interface State {
	user: {} | null;
	authIsReady: boolean;
	dispatch?: React.Dispatch<Action>;
}

export const AuthContext = createContext<State>({
	user: {},
	authIsReady: false,
	dispatch: () => null,
});

type User = {
	uid: string;
};

type Action =
	| { type: "LOGIN"; payload: User }
	| { type: "LOGOUT"; payload?: User }
	| { type: "AUTH_IS_READY"; payload: User | null };

export const authReducer = (state: State, action: Action): State => {
	const { type, payload } = action;

	switch (type) {
		case "LOGIN": {
			console.log(payload);
			return { ...state, user: payload };
		}
		case "LOGOUT":
			return { ...state, user: null };
		case "AUTH_IS_READY":
			return { user: payload, authIsReady: true };
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
