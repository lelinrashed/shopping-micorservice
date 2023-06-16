import { createContext } from "react";

export type AuthState = {
  isLoggedIn: boolean;
  user: {
    id: number | null;
    name: string | null;
    email: string | null;
    token: string | null;
  };
};

type AuthContextType = {
    authState: AuthState;
    setAuthState: (authState: AuthState) => void;
    logout: () => void;
};

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: {
    id: null,
    name: null,
    email: null,
    token: null,
  },
};

export const AuthContext = createContext<AuthContextType>({
	authState: initialAuthState,
	setAuthState: () => {},
  logout: () => {},
});