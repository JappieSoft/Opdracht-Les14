import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";

async function postUser(dataPush, setError, setApiData, toggleLoading) {
    const controller = new AbortController()
    setError("");
    toggleLoading(true);

    try {
        const response = await axios.post(
            "https://novi-backend-api-wgsgz.ondigitalocean.app/api/users",
            {
                email: dataPush.email,
                password: dataPush.password,
                roles: [dataPush.roles],
            },
            {
                headers: {"novi-education-project-id": `${import.meta.env.VITE_API_KEY}`},
                signal: controller.signal,
            }
        );
        setApiData(response.data);
        controller.abort();
    } catch (error) {
        setError("Er is iets fout gegaan met het registreren.");
        console.error(error);
    } finally {
        toggleLoading(false);
    }
}

function SignUp() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState("");
    const navigate = useNavigate();

    const onSubmit = (data) => {
        postUser(data, setError, setApiResponse, toggleLoading).then(() => {
            if (error.error) {
                console.log(error.error)
            } else {
                setTimeout(() => {
                    navigate("/signin");
                }, 1750);
            }
        });
    };

    console.log(apiResponse);

    useEffect(() => {
        return function cleanup() {
        }
    }, []);

    return (
        <>
            <h1>Registreren</h1>
            <p>Geweldig nieuws dat je onderdeel wil zijn van de Banana Security familie!</p>
            <p>Graag hieronder registreren:</p>
            {apiResponse && <div className="form-area">
                <h3>Registratie gelukt!</h3>
                <p>U word doorgestuurd...</p>
            </div>}
            {!apiResponse &&
                <form className="form-area" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">Email</label>
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
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        {...register("password", {
                            /*required: "required",*/
                            minLength: {
                                value: 5,
                                message: "min lengte is 5 characters",
                            },
                        })}
                        type="text" /*Deze kan ook op wachtwoord, maar dan krijg je een memory leak & heel veel get errors door wachtwoord app*/
                    />
                    {errors.password && <span role="alert">{errors.password.message}</span>}
                    <label htmlFor="user">Gebruikersnaam</label>
                    <input
                        type="text"
                        {...register("user", {required: true})}/>
                    {errors.user && <p className="errorMsg">{"De gebruikersnaam mag niet ontbreken."}</p>}
                    <input
                        type="hidden"
                        value="user,anonymous"
                        {...register("roles", {required: true})}/>
                    {errors.roles && <p className="errorMsg">{"De gebruiker rol mag niet ontbreken."}</p>}
                    <button type="submit">Registreren & Inloggen</button>
                </form>}

            {loading && <p>Registreren...</p>}
            {error && <h4 className="error">{error}</h4>}
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;