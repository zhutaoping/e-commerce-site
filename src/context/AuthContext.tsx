import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";

//* Reducer
type StateType = {
  user: User | null;
  authIsReady: boolean;
};

type Action =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT"; payload: null }
  | { type: "AUTH_IS_READY"; payload: User | null };

export const authReducer = (state: StateType, action: Action) => {
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

//* Context
type AuthContextType = {
  user: User | null;
  authIsReady: boolean;
  dispatch?: React.Dispatch<Action>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  authIsReady: false,
  dispatch: () => null,
});

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

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
