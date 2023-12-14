import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../state/cart.slice";
import { toggleMenu } from "../state/menu.slice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [showNavbar, setShowNavbar] = useState(true);
  const menuOpen = useSelector((state) => state.menu.isOpen);

  // Effect hook to add and remove the event listener for the scroll event when the component mounts and unmounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // function to handle scrolling event and hide or show the navbar
  function handleScroll() {
    const scrollY = window.scrollY;
    const threshold = 150;
    if (scrollY > threshold) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }

  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"}`}>
      <div className={`main-box ${showNavbar ? "show" : "hide"}`}>
        <div className="title" onClick={() => navigate("/")}>
          <h1>Les Confiotes de Mamie</h1>
        </div>
        <ul className="icons-box">
          <li className="icon">
            <i
              className="fa-solid fa-jar"
              onClick={() => navigate("/products")}
            ></i>
          </li>
          {cart.length > 0 ? (
            <li onClick={() => dispatch(setIsCartOpen({}))} className="icon">
              <span className="cart-badge">{cart.length}</span>
              <i className="fa-solid fa-cart-shopping"></i>
            </li>
          ) : (
            <li onClick={() => dispatch(setIsCartOpen({}))} className="icon">
              <i className="fa-solid fa-cart-shopping"></i>
            </li>
          )}
          <li>
            <div className="menu" onClick={(e) => dispatch(toggleMenu())}>
              {menuOpen ? (
                <i className="fa-solid fa-xmark"></i>
              ) : (
                <i className="fa-solid fa-bars"></i>
              )}
              <p>Menu</p>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
