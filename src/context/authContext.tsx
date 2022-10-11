import React, { createContext, ReactNode, useState } from "react";
import { useHistory } from "react-router";

interface cont {
  isLoggedIn: boolean | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  children: ReactNode;
}

export const authContext = createContext<cont>({
  isLoggedIn: false,
  setIsLoggedIn: (val) => undefined,
});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  const history = useHistory();

  if (isLoggedIn) {
    history.push("/");
  }

  return (
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn } as cont}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
