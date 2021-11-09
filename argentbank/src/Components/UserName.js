import React from "react";
//import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function UserName(props) {
    let test = document.getElementsByClassName("editName-container");
    let editbutton = document.getElementsByClassName("edit-button");
    let inputs = document.getElementsByTagName("input")
    console.log(inputs)
    const token = useSelector((state) => state.fetching.token);

    function handleEditButtonClick() {
        test[0].style.display = "inline-block";
        editbutton[0].style.display = "none";
    }
    function cancelClickNameEdit() {
        test[0].style.display = "none";
        editbutton[0].style.display = "inline-block";
    }

    async function apiPutName() {
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({firstName : inputs[0].value, lastName : inputs[1].value}),
            });
            const data = await response.json();
            console.log(data)
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
            <button onClick={handleEditButtonClick} className="edit-button">
                Edit Name
            </button>

            <div className="editName-container" style={{ display: "none" }}>
                <div>
                    <input name="firstName" className="edit-name-input-text" type="text" placeholder={props.firstName} />
                    <input name="lastName" className="edit-name-input-text" type="text" placeholder={props.lastName} />
                </div>
                <button className="edit-name-button" onClick={apiPutName}>
                    Save
                </button>
                <button className="edit-name-button" onClick={cancelClickNameEdit}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default UserName;
