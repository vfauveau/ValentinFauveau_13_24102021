import produce from "@reduxjs/toolkit/node_modules/immer";
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
export const userFetching = () => ({ type: FETCHING });
export const userResolved = (data) => ({ type: RESOLVED, payload: data });
export const userRejected = (error) => ({ type: REJECTED, payload: error });
export const tokenAssign = (token) => ({ type: TOKENASSIGN, payload: token });

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

export async function logout(store) {}
