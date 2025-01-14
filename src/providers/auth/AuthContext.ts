import { createContext, useContext } from "react";
import { User } from "../../domain/models";

export const AuthContext = createContext<{ user: User | null }>({ user: null });

export const useAuth = () => useContext(AuthContext);
