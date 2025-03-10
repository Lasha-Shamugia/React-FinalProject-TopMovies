import React, { useState } from "react";
import { authHandler } from "../../api/auth";
import authAction from "../../constants/authAction";
import { useAuthContext } from "../../context/AuthContextProvider";
import { LogInAction } from "../../context/actionCreators";
import { useNavigate } from "react-router-dom";
import routes from "../../constants/routes";


const SignInForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const [userInfo, setUserInfo] = useState({
    userName: "",
    password: "",
    error: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    authHandler(authAction.signIn, userInfo)
      .then((data) => {
        dispatch(LogInAction(data));
        navigate(routes.home);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-gradient">
      <div className="card shadow-lg p-5 mt-5" style={{ width: "350px", borderRadius: "12px" }}>
        <h2 className="text-center text-dark">Welcome Back!</h2>
        <p className="text-center text-muted">Sign in to continue exploring movies 🎬</p>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">User Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              name="userName"
              value={userInfo.userName}
              onChange={(e) =>
                setUserInfo((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              name="password"
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-3">
          New here?{" "}
          <span
            className="text-primary fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
