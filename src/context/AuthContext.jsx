import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState({isAuth: false, user: null});

    const logIn = (data) => {
        console.log(data);
        const inloggen = {
            user: data.email,
            isAuth: true,
        };
        setIsAuth(inloggen);
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    };

    const logOut = () => {
        const uitloggen = {
            user: null,
            isAuth: false,
        };
        setIsAuth(uitloggen);
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