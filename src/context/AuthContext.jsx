import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import tokenValid from "../helpers/tokenValidity";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState({isAuth: false, user: null, status: "done"});

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);

        if (token) {
            const decodedToken = jwtDecode(token)
            console.log(decodedToken);

            if (tokenValid(decodedToken)) {
                setIsAuth({
                    isAuth: true,
                    user: {
                        email: decodedToken.email,
                        roles: decodedToken.role,
                        userId: decodedToken.userId,
                    },
                    status: "done",
                });
            } else {
                logOut();
            }
        } else {
            setIsAuth({
                ...isAuth,
                status: "done",
            });
        }
    }, []);

    function logIn() {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token)

        setIsAuth({
            isAuth: true,
            user: {
                email: decodedToken.email,
                roles: decodedToken.role,
                userId: decodedToken.userId,
            },
            status: "done",
        });
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    };

    function logOut() {
        localStorage.removeItem("token");
        const uitloggen = {
            user: null,
            isAuth: false,
            status: "done",
        };
        setIsAuth(uitloggen);
        console.log("Gebruiker is ingelogd!");
        navigate("/");
    };

    const contextData = {
        authenticated: isAuth,
        logIn: logIn,
        logOut: logOut,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;