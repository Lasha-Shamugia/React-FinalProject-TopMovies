import { AUTHENTICATE, LOG_IN, LOG_OUT } from "./actions";

const LogInAction = (data) => {
  return { type: LOG_IN, payload: data };
};

const LogOutAction = () => {
  return { type: LOG_OUT };
};

const authenticateAction = (token) => {
  return {
    type: AUTHENTICATE,
    payload: token,
  };
};

export { LogInAction, LogOutAction, authenticateAction };
