import {
    CREATE_USER_ERROR,
    CREATE_USER_SUBMITTED,
    CREATE_USER_SUCCESS
} from "./SignupTypes";


const intialState = {
    usernameError: "",
    passwordError: "",
    isSubmitted: false
}


export const signupReducer = (state = intialState, action) => {
    switch (action.types) {
        case CREATE_USER_SUBMITTED:
            return {
                usernameError: "",
                passwordError: "",
                isSubmitted: true
            };
        case CREATE_USER_ERROR:
            const errorState = {
                usernameError: "",
                passwordError: "",
                isSubmitted: false
            };
            if (action.errorData.hasOwnProperty("username")) {
                errorState.usernameError = action.errorData["username"];
            }
            if (action.errorData.hasOwnProperty("password")) {
                errorState.passwordError = action.errorData["password"];
            }
            return errorState;
        case CREATE_USER_SUCCESS:
            return {
                usernameError: "",
                passwordError: "",
                isSubmitted: false
            };
        default:
            return state;
    }
}