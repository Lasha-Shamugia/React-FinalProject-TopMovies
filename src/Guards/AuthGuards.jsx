import React from 'react';
import { useAuthContext } from '../context/AuthContextProvider';
import AuthMessage from "../components/AuthMessage/AuthMessage";

const AuthGuards = ({ children }) => {
  const { state } = useAuthContext();
  return state.isAuthenticated ? children : <AuthMessage />;
};

export default AuthGuards;
