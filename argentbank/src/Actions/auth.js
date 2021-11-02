export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const PROFILE_INFO = "PROFILE_INFO";
export const CREDENTIALS_CHANGE = "CREDENTIALS_CHANGE";

export const login = (user) => {
    return {
        type: LOGIN,
        token: "",
        request:{
            status:user.value,
            message:user.message,
        }
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
        userIsLogged: false,
    };
};

export const getProfileInfo = (user) => {
    return {
        type: PROFILE_INFO,
        payload: user.payload,
        message: user.message,
    };
};
export const credentialsChange = (cred) => {
    return {
        type: CREDENTIALS_CHANGE,
        credentials: {
            email: cred.email,
            password: cred.password,
        },
    };
};
