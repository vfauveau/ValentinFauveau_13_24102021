export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const PROFILE_INFO = "PROFILE_INFO";
export const REDIRECT_PAGE = "REDIRECT_PAGE";
export const CREDENTIALS_CHANGE = "CREDENTIALS_CHANGE";

export const login = (user) => {
    return {
        type: LOGIN,
        payload: user.payload,
        token: "",
        userIsLogged: false,
        message: user.message,
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

export const redirectPage = (user) => {
    return {
        type: REDIRECT_PAGE,
        location: user.location,
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
