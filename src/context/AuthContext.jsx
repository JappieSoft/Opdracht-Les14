import {createContext, useState} from 'react';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState(true);

    function logIn() {
        toggleIsAuth(true);
    }

    function logOut() {
        toggleIsAuth(false);
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