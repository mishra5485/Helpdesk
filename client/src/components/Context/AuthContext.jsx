import react, { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  loginn: () => {},
  logout: () => {},
  token: null,
  userId: null,
});
