import React, { useState } from "react";
import Nav from "./Nav";
import { useDispatch, useStore } from "react-redux";
import { useHistory } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import { userFetching, userResolved, userRejected, tokenAssign } from "../App/calls";
import { userFetched, userInfo } from "../App/selectors";

// sign-in page react component
function SignIn() {
    const store = useStore();
    const dispatch = useDispatch();
    const history = useHistory();
    const [ErrorIsShown, setErrorIsShown] = useState(false);

    /** Set the credentials value to the input value */
    const handleInputChange = () => {
        const email = document.getElementsByName("email")[0];
        const password = document.getElementsByName("password")[0];
        dispatch({ type: "CREDENTIALS_CHANGE", email: email.value, password: password.value });
    };

    // a mettre dans le signIn ?
    async function fetchLogin(store) {
        const status = userFetched(store.getState()).status;
        const credentials = userInfo(store.getState()).credentials;
        if (status === "pending" || status === "updating") {
            return;
        }
        store.dispatch(userFetching());
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            store.dispatch(userResolved(data));
            if (data.status === 200 && data.message === "User successfully logged in") {
                const token = data.body.token;
                // store token
                store.dispatch(tokenAssign(token));
                localStorage.setItem("jwt", token);
                // get infos regarding user using store & token (post request)
                getUserInfo(store, token);
            } else if (data.status === 400) {
                console.log(data);
                return setErrorIsShown(true);
            } else if (data.status === 500) {
                console.log(data);
                return setErrorIsShown(true);
            }
        } catch (error) {
            store.dispatch(userRejected(error));
            console.log(error);
            return setErrorIsShown(true);
        }
    }

    // POST RETRIEVE USER INFO
    const getUserInfo = async (store, token) => {
        // get user Data using token
        store.dispatch(userFetching());
        fetch("http://localhost:3001/api/v1/user/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(),
        })
            .then((response) => response.json())
            .then((data) => {
                store.dispatch(userResolved(data));
                console.log("Success:", data);
                store.dispatch({ type: "ASSIGN_NAMES", firstName: data.body.firstName, lastName: data.body.lastName });
                localStorage.setItem("firstName", data.body.firstName);
                localStorage.setItem("lastName", data.body.lastName);
                if (data.status === 200 && data.message === "Successfully got user profile data") {
                    history.push("/profile");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                store.dispatch(userRejected(error));
            });
    };

    // Login attempt / get user Data
    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetchLogin(store);
    };

    return (
        <React.Fragment>
            <Nav />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <ErrorMessage ErrorIsShown={ErrorIsShown} />
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input name="email" onChange={handleInputChange} type="text" id="username" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input autoComplete="on" name="password" onChange={handleInputChange} type="password" id="password" />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button className="sign-in-button">Sign In</button>
                    </form>
                </section>
            </main>
        </React.Fragment>
    );
}

export default SignIn;
