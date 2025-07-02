import React, {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {AuthContext} from "../context/AuthContext.jsx";
import {Link} from "react-router-dom";

function SignUp() {
    const {logIn} = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [registerData, setRegisterData] = useState({});
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);

    const onSubmit = (data) => {
        logIn();
        setRegisterData(data);
/*      setError("No Error");
        toggleLoading(true);*/
        /*console.log(data);*/
    };
    console.log(registerData);

    useEffect(() => {
        return function cleanup() {
        }
    }, []);

    return (
    <>
      <h1>Registreren</h1>
      <p>Geweldig nieuws dat je onderdeel wil zijn van de Banana Security familie!</p>
      <p>Graag hieronder registreren:</p>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    required: "required",
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
            <button type="submit">Inloggen</button>
        </form>

        {loading && <p>Registreren...</p>}
        {error && <h4 className="error">{error}</h4>}
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;