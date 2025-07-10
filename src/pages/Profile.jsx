import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

async function getSecrets(dataRequest, token, setError, setApiData, toggleLoading) {
    const controller = new AbortController()
    const requestId = dataRequest.userId;
    setError("");
    toggleLoading(true);
    console.log(token);
    console.log(requestId);

    try {
        const response = await axios.get(
            `https://novi-backend-api-wgsgz.ondigitalocean.app/api/secrets/${requestId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "novi-education-project-id": `${import.meta.env.VITE_API_KEY}`,
                    "Authorization": `Bearer ${token}`,

                },
                signal: controller.signal,
            }
        );
        setApiData(response.data);
        console.log(response.data);
        controller.abort();
    } catch (error) {
        setError("Er is iets fout gegaan..");
        console.error(error);
    } finally {
        toggleLoading(false);
    }
};

function Profile() {
    const {authenticated} = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState("");

    useEffect(() => {
        getSecrets(authenticated.user, token, setError, setApiResponse, toggleLoading);
        console.log(apiResponse);
        return function cleanup() {
        }
    }, []);

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikers id nummer: </strong>{authenticated.user.userId}</p>
                <p><strong>Email: </strong>{authenticated.user.email}</p>
            </section>
            <section>
                <h2>Strikt geheime profiel-content</h2>
                {loading && <p>Ik ben enorm druk met de zoektocht naar geheimen!</p>}
                {error && <h4 className="error">{error}</h4>}
                {apiResponse && <div className="secret-area">
                    <h3>{apiResponse.title}</h3>
                    <p>{apiResponse.content}</p>
                </div>}
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;