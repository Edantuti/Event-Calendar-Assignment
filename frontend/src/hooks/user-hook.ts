import { createContext, useContext } from "react";

export interface UserContextType {
  first: string;
  last: string;
  email: string;
  setUser: (user: Partial<UserContextType>) => void;
}

const defaultUser: UserContextType = {
  first: "",
  last: "",
  email: "",
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(defaultUser);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(`useUserContext could be declared inside the UserProvider`);
  }
  return context;
}
