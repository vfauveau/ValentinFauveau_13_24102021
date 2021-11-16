import fetchingReducer from "./calls";
import { combineReducers, createStore } from "redux";
// state
const initialState = {
    userIsLogged: false,
    credentials: {
        email: "",
        password: "",
    },
    firstName: "",
    lastName: "",
    rememberMeChecked : false,
};

function credStateReducer(state = initialState, action) {
    if (action.type === "CREDENTIALS_CHANGE") {
        return {
            ...state,
            credentials: {
                email: action.email,
                password: action.password,
            },
        };
    }
    if (action.type === "ASSIGN_NAMES") {
        return {
            ...state,
            firstName: action.firstName,
            lastName: action.lastName,
        };
    }
    return state;
}

const reducer = combineReducers({
    userInfo: credStateReducer,
    fetching: fetchingReducer,
});

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export const store = createStore(reducer, reduxDevTools);
export default store;
