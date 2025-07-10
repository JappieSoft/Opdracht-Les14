import React, {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {AuthContext} from "../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import axios from "axios";

async function loginUser(dataPush, setError, setApiData, toggleLoading) {
    const controller = new AbortController()
    setError("");
    toggleLoading(true);

    try {
        const response = await axios.post(
            "https://novi-backend-api-wgsgz.ondigitalocean.app/api/login",
            {
                email: dataPush.email,
                password: dataPush.password,
            },
            {
                headers: {"novi-education-project-id": `${import.meta.env.VITE_API_KEY}`},
                signal: controller.signal,
            }
        );
        setApiData(response.data);
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        controller.abort();
    } catch (error) {
        setError("Er is iets fout gegaan met het registreren.");
        console.error(error);
    } finally {
        toggleLoading(false);
    }
}

function SignIn() {
    const {logIn} = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState("");

    const onSubmit = (data) => {
        loginUser(data, setError, setApiResponse, toggleLoading).then(() => {
            if (error.error) {
                console.log(error.error)
            } else {
                setTimeout(() => {
                    logIn();
                }, 1750);
            }
        });
    };

/*    console.log(loginData);*/

    useEffect(() => {
        return function cleanup() {
        }
    }, []);

    return (
        <>
            <h1>Inloggen</h1>
            <p>Leuk dat je wil inloggen op onze pagina, doe dat hieronder & geniet van alle data!</p>

            {apiResponse && <div className="form-area">
                <h3>Succesvol ingelogd!</h3>
                <p>U word doorgestuurd...</p>
            </div>}
            {!apiResponse &&
            <form className="form-area" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">email</label>
                <input
                    id="email"
                    {...register("email", {
                        required: "required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "De ingevoerde waarde komt niet overeen met een e-mailadres",
                        },
                    })}
                    type="email"
                />
                {errors.email && <span role="alert">{errors.email.message}</span>}
                <label htmlFor="password">password</label>
                <input
                    id="password"
                    {...register("password", {
                        required: "required",
                        minLength: {
                            value: 5,
                            message: "min lengte is 5 characters",
                        },
                    })}
                    type="text" /*Deze kan ook op wachtwoord, maar dan krijg je een memory leak & heel veel get errors door wachtwoord app*/
                />
                {errors.password && <span role="alert">{errors.password.message}</span>}
                <button type="submit">Inloggen</button>
            </form>}

            {loading && <p>Inloggen...</p>}
            {error && <h4 className="error">{error}</h4>}
            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;