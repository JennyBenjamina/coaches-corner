import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

  const isAuthorized = (role) => {
    if (Array.isArray(role)) {
      return role.some((r) => auth.roles?.includes(r)) || false;
    }
    return auth.roles?.includes(role) || false;
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isAuthorized, persist, setPersist }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
