import React from "react";
import Navbar from "../components/Navbar";
import CartValidation from "../components/CartValidation";
import Footer from "../components/Footer";
import ToggleMenu from "../components/ToggleMenu";
import { useSelector } from "react-redux";

const Checkout = () => {
  const menuOpen = useSelector((state) => state.menu.isOpen);
  return (
    <div className="checkout-page">
      <Navbar />
      <div className="bg-img"></div>
      {menuOpen ? <ToggleMenu menuOpen={menuOpen} /> : ""}
      <CartValidation />
      <Footer />
    </div>
  );
};

export default Checkout;
