import {createContext, useState} from 'react';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const [isAuth, toggleIsAuth] = useState(true);

    function logIn() {
        toggleIsAuth(true);
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    }

    function logOut() {
        toggleIsAuth(false);
        console.log("Gebruiker is uitgelogd!");
        navigate("/");
    }

    const data = {
        authenticated: isAuth,
        logIn: logIn,
        logOut: logOut,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;