import {
	createContext,
	useReducer,
	useEffect,
	useContext,
	ReactNode,
} from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";

//* REDUCER
type StateType = {
	user: User | null;
	authIsReady: boolean;
};

// Discriminated Union
type Action =
	| { type: "LOGIN"; payload: User }
	| { type: "LOGOUT" }
	| { type: "AUTH_IS_READY"; payload: User | null };

const authReducer = (state: StateType, action: Action) => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state };
		case "AUTH_IS_READY":
			return { user: action.payload, authIsReady: true };
		default:
			return state;
	}
};

//* CONTEXT
type AuthContextType = {
	user: User | null;
	authIsReady: boolean;
	dispatch: React.Dispatch<Action>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		authIsReady: false,
	});

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			dispatch({ type: "AUTH_IS_READY", payload: user });
		});
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
