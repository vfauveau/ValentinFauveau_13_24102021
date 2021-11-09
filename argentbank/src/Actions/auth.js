export const CREDENTIALS_CHANGE = "CREDENTIALS_CHANGE";
export const ASSIGN_NAMES = "ASSIGN_NAMES"
export const credentialsChange = (cred) => {
    return {
        type: CREDENTIALS_CHANGE,
        credentials: {
            email: cred.email,
            password: cred.password,
        },
    };
};

export const AssignNames = (user) => {
    return {
        type: ASSIGN_NAMES,
        firstName: user.firstName,
        lastName: user.lastName,
    };
};
