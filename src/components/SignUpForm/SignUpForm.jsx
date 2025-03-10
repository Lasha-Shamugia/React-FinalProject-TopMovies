import React, { useState } from "react";
import { authHandler } from "../../api/auth";
import authAction from "../../constants/authAction";
import { useNavigate } from "react-router-dom";
import routes from "../../constants/routes";
import "bootstrap/dist/css/bootstrap.min.css"; // Importamos Bootstrap

const SignUpForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    authHandler(authAction.signUp, user)
      .then(() => navigate(routes.signIn, { state: { success: true } }))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-gradient">
      <div className="card shadow-lg p-4 mt-5" style={{ width: "350px", borderRadius: "12px" }}>
        <h2 className="text-center text-dark">Join the Movie Club!</h2>
        <p className="text-center text-muted">Create an account to start your movie journey 🍿</p>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">User Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              name="userName"
              value={user.userName}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              name="email"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({
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
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            className="text-primary fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
