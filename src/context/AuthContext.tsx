import { createContext, useReducer, useEffect } from "react";

import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

interface UserAuth {
	uid: string;
}

interface State {
	user: {} | UserAuth | null;
	authIsReady: boolean;
	dispatch?: React.Dispatch<Action>;
}

export const AuthContext = createContext<State>({
	user: {},
	authIsReady: false,
	dispatch: () => null,
});

type Action =
	| { type: "LOGIN"; payload: {} }
	| { type: "LOGOUT"; payload: null }
	| { type: "AUTH_IS_READY"; payload: {} | null };

export const authReducer = (state: State, action: Action): State => {
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
		user: {},
		authIsReady: false,
	});

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			dispatch({ type: "AUTH_IS_READY", payload: user });
			unsub();
		});
	}, []);

	// console.log("AuthContext state:", state);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
