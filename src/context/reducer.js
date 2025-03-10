import { toggleLocalStorage } from "../utils/jwt";
import { AUTHENTICATE, LOG_IN, LOG_OUT } from "./actions";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const reducer = (state, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case LOG_IN:
      const { token } = payload;
      const user = jwtDecode(token);

      toggleLocalStorage(token);
      return { isAuthenticated: true, user };

    case AUTHENTICATE: {
      const user = jwtDecode(payload);
      return { isAuthenticated: true, user };
    }

    case LOG_OUT:
      toggleLocalStorage(null);
      return { isAuthenticated: false, user: null }; // Cierra sesión correctamente

    default:
      return state;
  }
};

export { initialState, reducer };
