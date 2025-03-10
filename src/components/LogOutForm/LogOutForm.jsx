import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";
import { LogOutAction } from "../../context/actionCreators";
import routes from "../../constants/routes";

const LogOutForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  useEffect(() => {
    // Eliminar usuario y token del localStorage
    localStorage.removeItem("accessToken");

    // Actualizar el estado global de autenticación
    dispatch(LogOutAction());

    // Redirigir a Home.jsx
    navigate(routes.home);
  }, [dispatch, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 text-center shadow-lg" style={{ width: "350px", borderRadius: "12px" }}>
        <h2 className="text-danger">Logging Out...</h2>
        <p>You are being redirected to the home page.</p>
      </div>
    </div>
  );
};

export default LogOutForm;
