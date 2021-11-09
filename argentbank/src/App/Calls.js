import produce from "@reduxjs/toolkit/node_modules/immer";
import { userFetched, userInfo } from "./selectors";

// state
const initialState = {
    status: "void",
    data: null,
    error: null,
    token: "",
};
const FETCHING = "fetching";
const RESOLVED = "resolved";
const REJECTED = "rejected";
const TOKENASSIGN = "tokenAssign";

// actions creators
const userFetching = () => ({ type: FETCHING });
const userResolved = (data) => ({ type: RESOLVED, payload: data });
const userRejected = (error) => ({ type: REJECTED, payload: error });
const tokenAssign = (token) => ({ type: TOKENASSIGN, payload: token });

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
            case TOKENASSIGN: {
                draft.token = action.payload;
                return;
            }
            default:
                return;
        }
    });
}

/**login async function (post) */
//if status === 200 && message === "User successfully logged in"
// dispatch action changer le token
// puis dispatch => action recuperer les infos en passant le token en parametre
// puis on remet les conditions (resolved rejected etc)
// on dispatch changement de state nom et prenom
// puis on change de page en passant en parametre (state / props) les noms prenoms récupérés
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
        if (data.status === 200 && data.message === "User successfully logged in") {
            const token = data.body.token;
            // store token
            store.dispatch(tokenAssign(token));
            localStorage.setItem("jwt", token);
            // get infos regarding user using store & token (post request)
            getUserInfo(store, token);
        }

        return data;
    } catch (error) {
        store.dispatch(userRejected(error));
    }
}

// POST RETRIEVE USER INFO
const getUserInfo = (store, token) => {
    // get user Data using token
    store.dispatch(userFetching());
    fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(),
    })
        .then((response) => response.json())
        .then((data) => {
            store.dispatch(userResolved(data));
            console.log("Success:", data);
            store.dispatch({ type: "ASSIGN_NAMES", firstName: data.body.firstName, lastName: data.body.lastName });
            localStorage.setItem("firstName", data.body.firstName);
            localStorage.setItem("lastName", data.body.lastName);
        })
        .catch((error) => {
            console.error("Error:", error);
            store.dispatch(userRejected(error));
        });
};

export async function logout(store) {}
