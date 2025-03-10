import React from 'react';
import { Routes, Route } from "react-router-dom";
import appRoutes from './config/routes';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn'; // Importamos SignIn
import SignUp from './pages/SignUp/SignUp';
import MovieDetails from "./components/MovieDetails/MovieDetails";

const AppRoutes = ({ cart, setCart }) => {  
  return ( 
    <Routes>
      <Route key="home" path="/" element={<Home cart={cart} setCart={setCart} />} /> 
      <Route key="sign-in" path="/sign-in" element={<SignIn />} />
      <Route key="sign-up" path="/sign-up" element={<SignUp />} />
      <Route key="cart" path="/cart" element={<Cart cart={cart} setCart={setCart} />} /> 
      <Route key="details" path="/details/:id" element={<MovieDetails />} /> 

      {appRoutes.map((route, index) => (
        <Route 
          key={route.path || index} // Se asigna un key único a cada Route
          path={route.path}
          element={
            route.Guard ? <route.Guard><route.Component /></route.Guard> : <route.Component />
          }
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;




// აპროუთსში როუთსევ ლოგიკა გავიტანეთ აბსტრაქციაზე
// სადაც გვაქვს კონფიგ/ში routes.jsში გაწერილი მასივი სადაც შექმნილია
// ობიექტები თავისი პეტჰ/ით რა მისამართი მინდა რომ დაიხატოს და 
// კომპონენტში რა კომპონენტი უნდა გამოჩნდეს
