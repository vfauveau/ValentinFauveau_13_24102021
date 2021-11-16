import React from "react";
//import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserName(props) {
    const dispatch = useDispatch();
    let test = document.getElementsByClassName("editName-container");
    let editbutton = document.getElementsByClassName("edit-button");
    let inputs = document.getElementsByTagName("input");
    const token = useSelector((state) => state.fetching.token);

    // show the editor
    function showNameEdit() {
        test[0].style.display = "inline-block";
        editbutton[0].style.display = "none";
    }
    // hide the editor
    function hideNameEdit() {
        test[0].style.display = "none";
        editbutton[0].style.display = "inline-block";
    }
    function capitalizeFirstLetter(string) {
        string = string.trim();
        return string[0].toUpperCase() + string.slice(1);
    }
    // check if the inputs are empty // else Put request + state update (firstName - lastName)
    function filterValues() {
        if (inputs[0].value === "" || inputs[1].value === "") {
            alert("Veuillez remplir les deux champs");
        } else {
            apiPutName(capitalizeFirstLetter(inputs[0].value), capitalizeFirstLetter(inputs[1].value));
        }
    }

    async function apiPutName(firstName, lastName) {
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ firstName: firstName, lastName: lastName }),
            });
            const data = await response.json();
            dispatch({ type: "ASSIGN_NAMES", firstName: data.body.firstName, lastName: data.body.lastName });
            localStorage.setItem("firstName", data.body.firstName);
            localStorage.setItem("lastName", data.body.lastName);
            hideNameEdit();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="header">
            <h1>
                Welcome back
                <br />
                {props.firstName + " " + props.lastName}
            </h1>
            <button onClick={showNameEdit} className="edit-button">
                Edit Name
            </button>

            <div className="editName-container" style={{ display: "none" }}>
                <div>
                    <input pattern="[a-z]{2,20}" required name="firstName" className="edit-name-input-text" type="text" placeholder={props.firstName} />
                    <input pattern="[a-z]{2,20}" required name="lastName" className="edit-name-input-text" type="text" placeholder={props.lastName} />
                </div>
                <button className="edit-name-button" onClick={filterValues}>
                    Save
                </button>
                <button className="edit-name-button" onClick={hideNameEdit}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default UserName;
