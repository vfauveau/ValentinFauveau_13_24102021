import fetchingReducer from "./calls";
import { combineReducers, createStore } from "redux";
// state
const initialState = {
    userIsLogged: false,
    token: "",
    credentials: {
        email: "",
        password: "",
    },
};

function loginReducer(state = initialState, action) {
    if (action.type === "CREDENTIALS_CHANGE") {
        return {
            ...state,
            credentials: {
                email: action.email,
                password: action.password,
            },
        };
    }
    return state;
}

// POST RETRIEVE USER INFO 
// export const getUserInfo = () => {
//     // get user Data using token
//     fetch("http://localhost:3001/api/v1/user/profile", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${store.token}`,
//         },
//         body: JSON.stringify(store.credentials),
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log("Success:", data);
//         })
//         .catch((error) => {
//             console.error("Error:", error);
//         });
// };

const reducer = combineReducers({
    userInfo: loginReducer,
    fetching: fetchingReducer,
});

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export const store = createStore(reducer, reduxDevTools);
export default store;
