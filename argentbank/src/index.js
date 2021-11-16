import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import SignIn from "./Components/SignIn";
import Homepage from "./Components/Homepage";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { store } from "./App/store";
import { Provider } from "react-redux";
import Profile from "./Components/Profile";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Router>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/login" component={SignIn} />
                    <Route exact path="/profile" component={Profile} />
                </Switch>
            </Router>
            <Footer />
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);
