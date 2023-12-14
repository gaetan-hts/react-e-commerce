// FixedCart.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../state/cart.slice";

const FixedCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [showFixedCart, setShowFixedCart] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollCart);
    return () => {
      window.removeEventListener("scroll", handleScrollCart);
    };
  }, []);

  function handleScrollCart() {
    const scrollY = window.scrollY;
    const threshold = 150;
    if (scrollY > threshold) {
      setShowFixedCart(true);
    } else {
      setShowFixedCart(false);
    }
  }

  return (
    <div
      onClick={() => dispatch(setIsCartOpen({}))}
      className={`fixed-cart ${showFixedCart ? "show" : "hide"}`}
    >
      {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
      <i className="fa-solid fa-cart-shopping"></i>
    </div>
  );
};

export default FixedCart;
