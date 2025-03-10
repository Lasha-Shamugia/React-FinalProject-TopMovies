import routes from "../constants/routes";
import AuthGuards from "../Guards/AuthGuards";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";

const appRoutes = [
  { path: routes.home, Component: Home, Guard: AuthGuards },
  { path: routes.products, Component: Products, Guard: AuthGuards },
  { path: routes.signIn, Component: SignIn },
  { path: routes.signUp, Component: SignUp },
];

export default appRoutes;
