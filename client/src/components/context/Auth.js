import { createContext } from "react";

export const Auth = createContext({
  isLoggedIn: false,
  loginn: () => {},
  logout: () => {},
  token: null,
  userId: null,
});
