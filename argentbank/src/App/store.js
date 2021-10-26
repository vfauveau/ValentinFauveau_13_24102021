import { configureStore } from "@reduxjs/toolkit";

// state
const initialState = {
    userIsLogged: false,
    token: "",
    user:{email:"", password:""}
};

function loginReducer(state = initialState, action) {
    if (action.type === "LOGIN") {
        return {
            ...state,
            token: "test",
            userIsLogged:true,
        };
    }
    return state
}

export const store = configureStore({
    reducer : loginReducer
});

store.subscribe(() => {
    console.log(store.getState());
});
