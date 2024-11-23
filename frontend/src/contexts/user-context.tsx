import { useState, ReactNode } from "react";
import { UserContext, UserContextType } from "../hooks/user-hook";

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<Omit<UserContextType, "setUser">>({
    first: "",
    last: "",
    email: "",
  });

  const setUser = (updatedUser: Partial<UserContextType>) => {
    setUserState((prev) => ({
      ...prev,
      ...updatedUser,
    }));
  };

  return (
    <UserContext.Provider value={{ ...user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;
