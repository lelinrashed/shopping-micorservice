"use client";

import { CookieValueTypes, getCookie, setCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext, AuthState, initialAuthState } from "./auth-context";

type PageProps = {
  children: React.ReactNode;
};

const cookieOptions: OptionsType = {
	maxAge: 60 * 60 * 24 * 30,
	sameSite: "strict",
	path: "/",
};

export default function AuthProvider({ children }: PageProps) {
  const [authState, setAuthState] = useState(initialAuthState);

  const setState = useCallback((s: AuthState) => {
    setCookie("auth", JSON.stringify(s), cookieOptions);
    setAuthState(s);
  }, []);

  const logout = useCallback(() => {
    setCookie("auth", "", { ...cookieOptions, maxAge: -1 });
    setAuthState(initialAuthState);
  }, []);

  const authContextValue = useMemo(
    () => ({
      authState,
      setAuthState: setState,
      logout,
    }),
    [authState, setState, logout]
  );

  useEffect(() => {
    const auth: CookieValueTypes = getCookie("auth");
    
    if (typeof auth === "string") {
      setAuthState(JSON.parse(auth));
    }
    
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

