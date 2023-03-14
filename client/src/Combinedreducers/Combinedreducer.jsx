import Login from "../reducer/Increment";
import { combineReducers } from "redux";

const CombineReducers = combineReducers({
  LoginUserData: Login,
});

export default CombineReducers;
