import { createContext, ReactNode } from "react";
import { api } from "../services/api";

type SignInCredencials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credencials: SignInCredencials): Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn({ email, password }: SignInCredencials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
