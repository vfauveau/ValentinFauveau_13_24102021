import React, { useState } from "react";
import Nav from "./Nav";

function SignIn() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [token, setToken] = useState("");

    /** Set the credentials value to the input value */
    const handleInputChange = (event) => {
        const value = event.target.value;
        setCredentials({
            ...credentials,
            [event.target.name]: value,
        });
    };

    // Login attempt / get user Data
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:3001/api/v1/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setToken(data.body.token);
                console.log(token);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        // get user Data using token
        fetch("http://localhost:3001/api/v1/user/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(credentials),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    return (
        <React.Fragment>
            <Nav />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input name="email" onChange={handleInputChange} type="text" id="username" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input name="password" onChange={handleInputChange} type="password" id="password" />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button to="/user.html" className="sign-in-button">
                            Sign In
                        </button>
                    </form>
                </section>
            </main>
        </React.Fragment>
    );
}

export default SignIn;
