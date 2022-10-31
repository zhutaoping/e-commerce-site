import { createContext, useReducer, useEffect } from "react";

import { auth } from "../firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthTypes {
	user: User | null;
	authIsReady: boolean;
	dispatch?: React.Dispatch<Action>;
}

export const AuthContext = createContext<AuthTypes>({
	user: null,
	authIsReady: false,
	dispatch: () => null,
});

type Action =
	| { type: "LOGIN"; payload: User }
	| { type: "LOGOUT"; payload: null }
	| { type: "AUTH_IS_READY"; payload: User | null };

export const authReducer = (state: AuthTypes, action: Action): AuthTypes => {
	const { type, payload } = action;

	switch (type) {
		case "LOGIN":
			return { ...state, user: payload };
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
		user: null,
		authIsReady: false,
	});

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			dispatch({ type: "AUTH_IS_READY", payload: user });
		});
	}, []);

	// console.log("AuthContext state:", state);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
