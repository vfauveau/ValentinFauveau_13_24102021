import fetchingReducer from "./calls";
import { combineReducers, createStore } from "redux";
// state
const initialState = {
    userIsLogged: false,
    firstName: "",
    lastName: "",
    rememberMeChecked: false,
};

function displayReducer(state = initialState, action) {
    if (action.type === "ASSIGN_NAMES") {
        return {
            ...state,
            firstName: action.firstName,
            lastName: action.lastName,
        };
    }
    if (action.type === "CHECK_REMEMBER_ME") {
        return {
            ...state,
            rememberMeChecked: true,
        };
    }
    return state;
}

const reducer = combineReducers({
    userInfo: displayReducer,
    fetching: fetchingReducer,
});

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export const store = createStore(reducer, reduxDevTools);
export default store;
