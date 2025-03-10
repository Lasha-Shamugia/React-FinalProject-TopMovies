import React from "react";
import { useNavigate } from "react-router-dom";
import routes from "../../constants/routes";

const AuthMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <h1>You are not Authenticated</h1>
      <p>Please Sign In or Sign Up</p>
      <div className="auth-buttons">
        <button className="btn btn-primary btn-lg" onClick={() => navigate(routes.signIn)}>
          Sign In
        </button>
        <button className="btn btn-success btn-lg" onClick={() => navigate(routes.signUp)}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AuthMessage;
