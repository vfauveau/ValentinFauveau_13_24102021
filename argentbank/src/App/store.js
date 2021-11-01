import { configureStore } from "@reduxjs/toolkit";

// state
const initialState = {
    userIsLogged: false,
    token: "",
    payload: {},
    credentials:{
        email:"",
        password:"",
    }
};

function loginReducer(state = initialState, action) {
    if (action.type === "LOGIN") {
        return {
            ...state,
            payload: action.payload,
            token: action.token,
            userIsLogged: true,
        };
    }
    if (action.type === "PROFILE_INFO") {
        return {
            ...state,
            payload: action.payload,
        };
    }
    if(action.type === "CREDENTIALS_CHANGE"){
        return {
            ...state,
            credentials:{
                email:action.email,
                password:action.password
            }
        }
    }
    return state;
}

export const store = configureStore({
    reducer: loginReducer,
});

export const login = async () => {
    fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(store.getState().credentials),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success", data)
            localStorage.setItem("jwt", data.body.token);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};
store.subscribe(() => {
    console.log(store.getState());
});
