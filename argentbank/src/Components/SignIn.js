import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
function SignIn() {
    return (
        <React.Fragment>
            <Nav />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <Link to="/user.html" className="sign-in-button">
                            Sign In
                        </Link>
                    </form>
                </section>
            </main>
        </React.Fragment>
    );
}

export default SignIn;
