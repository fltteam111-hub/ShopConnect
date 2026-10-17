import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import SearchBar from "./components/SearchBar";
import Cart from "./components/Cart";
import { ThemeContext } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Router>
        <div className="app-shell">
          <nav className="navbar">
            <Link className="brand" to="/"> 🛍️ LHYAshop</Link>
            <div className="nav-links">
              <Link to="/">Accueil</Link>
              <Link to="/about">À propos</Link>
              <Link to="/products">Produits</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </nav>
          <main className="main-content">
            <SearchBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />}>
                <Route path=":id" element={<ProductDetails />} />
              </Route>
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <footer className="footer">LHYAshop — Mini-application React</footer>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}
