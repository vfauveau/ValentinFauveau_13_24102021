import produce from "@reduxjs/toolkit/node_modules/immer";
import { userFetched, userInfo } from "./selectors";
// state
const initialState = {
    status: "void",
    data: null,
    error: null,
};
const FETCHING = "fetching";
const RESOLVED = "resolved";
const REJECTED = "rejected";

// actions creators
const userFetching = () => ({ type: FETCHING });
const userResolved = (data) => ({ type: RESOLVED, payload: data });
const userRejected = (error) => ({ type: REJECTED, payload: error });

// reducer
export default function fetchingReducer(state = initialState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case FETCHING: {
                if (draft.status === "void") {
                    draft.status = "pending";
                    return;
                }
                if (draft.status === "rejected") {
                    draft.error = null;
                    draft.status = "pending";
                    return;
                }
                if (draft.status === "resolved") {
                    draft.status = "updating";
                    return;
                }
                return;
            }
            case RESOLVED: {
                if (draft.status === "pending" || draft.status === "updating") {
                    draft.data = action.payload;
                    draft.status = "resolved";
                    return;
                }
                return;
            }
            case REJECTED: {
                if (draft.status === "pending" || draft.status === "updating") {
                    draft.error = action.payload;
                    draft.data = null;
                    draft.status = "rejected";
                    return;
                }
                return;
            }
            default:
                return;
        }
    });
}

/**login async function (post) */
export async function fetchLogin(store) {
    const status = userFetched(store.getState()).status;
    const credentials = userInfo(store.getState()).credentials;
    if (status === "pending" || status === "updating") {
        return;
    }
    store.dispatch(userFetching());
    try {
        const response = await fetch("http://localhost:3001/api/v1/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        store.dispatch(userResolved(data));
        console.log("Success", data)
    } catch (error) {
        store.dispatch(userRejected(error));
    }

}

export async function logout(store){

}
