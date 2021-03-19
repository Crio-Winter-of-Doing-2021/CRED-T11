import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import {signupReducer} from "./components/Signup/SignupReducer";
import {loginReducer} from "./components/Login/LoginReducer";
const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    createUser:signupReducer,
    auth:loginReducer,
  });

export default createRootReducer;