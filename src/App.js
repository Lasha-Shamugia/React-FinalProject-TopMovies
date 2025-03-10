import "./App.css";
import AppRoutes from "./AppRoutes";
import NavBar from "./components/NavBar/NavBar";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer/Footer";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-mode" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setShowFooter(isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`App ${theme}`}>
      <NavBar cartCount={cart.length} toggleTheme={toggleTheme} theme={theme} />
      <AppRoutes cart={cart} setCart={setCart} />
      <Footer showFooter={showFooter} />
    </div>
  );
}

export default App;

// მთავარ გვერდზე გვაქვს ნავბარი და აპროუთსი
