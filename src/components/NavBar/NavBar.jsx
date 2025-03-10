import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";
import { LogOutAction } from "../../context/actionCreators";
import routes from '../../constants/routes';
import newIcon from "../../assets/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import bestIcon from "../../assets/bestIiicon.png";

const appRoutes = Object.entries(routes);

const NavBar = ({ cartCount, toggleTheme, theme }) => { 
  const navigate = useNavigate();
  const { dispatch, state } = useAuthContext();

  return ( 
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="d-flex align-items-center">
        {appRoutes.map(([key, value]) => (
          key !== "cart" && key !== "details" && key !== "logout" && key !== "signIn" && key !== "signUp" && (
            <button 
              className="btn btn-secondary me-2 d-flex align-items-center btn-lg" 
              key={key} 
              onClick={() => navigate(value)}
            >
              {key === "home" ? (
                <>
                  <img src={newIcon} alt="New Icon" style={{ height: "30px", marginLeft: "8px" }} />
                </>
              ) : key === "products" ? (
                <>
                  Top Movies
                  <img src={bestIcon} alt="Best Icon" style={{ height: "20px", marginLeft: "8px" }} />
                </>
              ) : key}
            </button>
          )
        ))}
      </div>
      
      <div className="ms-auto d-flex align-items-center">
      <button 
          className={`btn me-2 btn-lg ${theme === "dark" && cartCount > 0 ? "btn-warning" : cartCount > 0 ? "btn-info selected" : "btn-outline-info"}`} 
          onClick={() => navigate(routes.cart)}
        >
          🛒 Cart ({cartCount})
        </button>
        <button 
          className="btn btn-secondary me-2 btn-lg" 
          onClick={toggleTheme}
        >
          {theme === "dark" ? "☀️ Mode" : "🌙 Mode"}
        </button>
        {state.isAuthenticated && (
          <button 
            className="btn btn-outline-danger btn-lg" 
            onClick={() => dispatch(LogOutAction())}
          >
            🚪 Log Out
          </button>
        )}
        {!state.isAuthenticated && (
          <>
            <button 
              className="btn btn-primary me-2 btn-lg" 
              onClick={() => navigate(routes.signIn)}
            >
              Sign In
            </button>
            <button 
              className="btn btn-success btn-lg" 
              onClick={() => navigate(routes.signUp)}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;


