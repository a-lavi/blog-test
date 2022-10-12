import { createContext, useState,useEffect } from "react";

const AuthContext = createContext({});
 
 
export const AuthProvider = ({ children }) => {
    
    const [auth, setAuth] = useState({username: null,
        password: null,
        roles: null,
        accessToken: null,
        isAuthenticated: false,});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);    
    /* const [authState, setAuthState] = useState({
        user: null,
        isAuthenticated: false,
      }); */
    
   
    return (
        <AuthContext.Provider value={{ auth, setAuth,persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;