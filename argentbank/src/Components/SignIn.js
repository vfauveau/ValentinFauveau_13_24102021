import React from "react";
import Nav from "./Nav";
import { useDispatch, useStore } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchLogin } from "../App/calls";
function SignIn() {
    const store = useStore();
    const dispatch = useDispatch();
    const history = useHistory();
    /** Set the credentials value to the input value */
    const handleInputChange = () => {
        const email = document.getElementsByName("email")[0];
        const password = document.getElementsByName("password")[0];
        dispatch({ type: "CREDENTIALS_CHANGE", email: email.value, password: password.value });
    };

    // go to profile page
    const goToProfilePage = () => {
        history.push("/profile");
    };

    // Login attempt / get user Data
    const handleSubmit = async (event) => {
        event.preventDefault();
            // temporaire    // temporaire    // temporaire
            fetchLogin(store)
            goToProfilePage()
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
