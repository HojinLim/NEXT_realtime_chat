import { createContext, useContext, useState } from "react";
import { RefreshUpdate } from "react-refresh"; 

export const AuthContext = createContext(null as any);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: any) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("any") ?? "null") || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
