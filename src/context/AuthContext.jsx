import {createContext, useState} from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const [isAuth, toggleIsAuth] = useState({isAuth: false, user: ""});

    const logIn = (data) => {
        const inloggen = {
            ...data,
            isAuth: true,
        };
        toggleIsAuth(inloggen);
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    };

    const logOut = (data) => {
        const uitloggen = {
            ...data,
            isAuth: false,
        };
        toggleIsAuth(uitloggen);
        console.log("Gebruiker is ingelogd!");
        navigate("/");
    };

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