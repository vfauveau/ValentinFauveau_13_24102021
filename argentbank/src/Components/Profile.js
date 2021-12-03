import React from "react";
import argentBankLogo from "../img/argentBankLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { tokenAssign } from "../App/calls";
import UserName from "./UserName";

// profile page component
function Profile() {
    const history = useHistory();
    const firstName = useSelector((state) => state.userInfo.firstName);
    const lastName = useSelector((state) => state.userInfo.lastName);
    const dispatch = useDispatch();

    // Checks if token exists in localStorage, if not redirects the user to the homepage.
    if (localStorage.getItem("jwt") === null) {
        history.push("/");
    }

    // Checks if localstorage is filled, if yes, the names are displayed using the localstorage values
    if ("firstName" in localStorage) {
        dispatch({ type: "ASSIGN_NAMES", firstName: localStorage.getItem("firstName"), lastName: localStorage.getItem("lastName") });
        dispatch(tokenAssign(localStorage.getItem("jwt")));
    }
    function logout() {
        localStorage.clear();
    }
    return (
        <React.Fragment>
            <nav className="main-nav">
                <a className="main-nav-logo" href="/">
                    <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </a>
                <div>
                    <a className="main-nav-item" href="/">
                        <i className="fa fa-user-circle"></i>
                        {" " + firstName}
                    </a>
                    <a onClick={logout} className="main-nav-item" href="/">
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </a>
                </div>
            </nav>
            <main className="main bg-dark">
                <UserName firstName={firstName} lastName={lastName} />
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>
        </React.Fragment>
    );
}

export default Profile;
