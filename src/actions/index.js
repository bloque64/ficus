import { LOG_IN } from "../constants/action-types.js";

export const Login = login => ({ type: LOG_IN, payload: login});
