import React from "react";
import Navbar from "../components/Navbar";
import CartMenu from "../components/CartMenu";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ToggleMenu from "../components/ToggleMenu";

const Failed = () => {
  const menuOpen = useSelector((state) => state.menu.isOpen);
  const navigate = useNavigate();
  return (
    <>
      <div className="failed-page">
        <Navbar />
        <CartMenu />
        <div
          className="failed-container
        "
        >
          <h2>Confirmation de commande :</h2>
          <div className="order-confirmation-container">
            <i class="fa-solid fa-xmark"></i>
            <div className="message-container">
              <h3>Echec de la commande :(</h3>
              <p>
                Le paiment de votre commande à échoué, nous n'avaons donc pas
                reçu cette dernière, merci de réessayer.
              </p>
            </div>
          </div>
          <button onClick={() => navigate("/")}>Accueil</button>
        </div>
      </div>
      {menuOpen ? <ToggleMenu menuOpen={menuOpen} /> : ""}
      <Footer />
    </>
  );
};

export default Failed;
