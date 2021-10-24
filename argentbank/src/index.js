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
import User from "./Components/User";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/sign-in.html" component={SignIn} />
                    <Route path="/user.html" component={User} />
                </Switch>
            </Router>
            <Footer />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
