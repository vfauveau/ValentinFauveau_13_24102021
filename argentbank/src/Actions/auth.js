export const ASSIGN_NAMES = "ASSIGN_NAMES"
export const CHECK_REMEMBER_ME = "CHECK_REMEMBER_ME"
export const AssignNames = (user) => {
    return {
        type: ASSIGN_NAMES,
        firstName: user.firstName,
        lastName: user.lastName,
    };
};
export const rememberBe = () => {
    return {
        type : CHECK_REMEMBER_ME,
        rememberMeChecked : true
    }
}