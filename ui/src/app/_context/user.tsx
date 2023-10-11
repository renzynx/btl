"use client";

import { createContext, useContext, useState, FC, ReactElement } from "react";
import { AuthResponse } from "../_libs/interfaces";

interface IUserContext {
  user: AuthResponse | null;
  setUser: (user: AuthResponse) => void;
}

const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export const UserContextProvider: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthResponse | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
