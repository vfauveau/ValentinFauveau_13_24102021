import React from "react";
import { useSelector } from "react-redux";
// component that is used to display the error message to the user
function ErrorMessageTrue() {
    const message = useSelector(state => state.fetching.data.message)
    return <p style={{color : "red"}}>{message}</p>;
}
function ErrorMessageFalse() {
    return null;
}
function ErrorMessage(props) {
    const ErrorIsShown = props.ErrorIsShown;
    if (ErrorIsShown) {
        return <ErrorMessageTrue />;
    }
    return <ErrorMessageFalse />;
}
export default ErrorMessage;
