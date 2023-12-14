import React from "react";
import logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { closeMenu, toggleMenu } from "../state/menu.slice";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../state/search.slice";
import CopyToClipboard from "react-copy-to-clipboard";

const ToggleMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search);
  const menuOpen = useSelector((state) => state.menu.isOpen);

  return (
    <div className="toggleMenu-container">
      <div className="right-side" onClick={() => dispatch(closeMenu({}))}></div>
      <div className="left-side">
        <div
          className="menu-toggle-button"
          onClick={(e) => dispatch(toggleMenu())}
        >
          <p>Menu</p>
          <i className={`fas fa-${menuOpen ? "times" : "bars"}`}></i>
        </div>
        <ul className="menu-list">
          <li className="search-input-toggle">
            <input
              type="text"
              placeholder="Rechercher"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={() => {
                navigate("/products");
                dispatch(toggleMenu());
              }}
            ></i>
          </li>
          <li
            onClick={() => {
              navigate("/");
              dispatch(toggleMenu());
            }}
          >
            <p>Accueil</p>
          </li>
          <li
            onClick={() => {
              navigate("/products");
              dispatch(toggleMenu());
            }}
          >
            <p>Nos Produits</p>
          </li>
          <li
            onClick={() => {
              navigate("/checkout");
              dispatch(toggleMenu());
            }}
          >
            <p>Panier</p>
          </li>
        </ul>
        <div className="social-link">
          <ul>
            <a
              href="https://www.facebook.com/LesConfiotesdeMamie?locale=fr_FR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>
                <i className="fab fa-facebook-f"></i>
              </li>
            </a>
            <a
              href="https://www.instagram.com/les_confiotesdemamie/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>
                <i className="fab fa-instagram"></i>
              </li>
            </a>
            <a href="mailto:lesconfiotesdemamie@gmail.com">
              <li>
                <i className="fa fa-envelope"></i>
              </li>
            </a>
          </ul>
        </div>
        <div className="contact-info">
          <h2>Les confiotes de Mamie</h2>
          <p className="address">118 Av. de la République, 83210 La Farlède</p>
          <CopyToClipboard
            text="lesconfiotesdemamie@gmail.com"
            className="hover"
          >
            <p
              style={{ cursor: "pointer" }}
              className="clipboard"
              onClick={() => alert("Email copié !")}
            >
              lesconfiotesdemamie@gmail.com
            </p>
          </CopyToClipboard>
          <CopyToClipboard text="06 46 41 31 59" className="hover">
            <p
              style={{ cursor: "pointer" }}
              className="clipboard"
              onClick={() => alert("Téléphone copié !")}
            >
              06 46 41 31 59
            </p>
          </CopyToClipboard>
        </div>
        <div className="title" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className="logo-menu" />
        </div>
      </div>
    </div>
  );
};

export default ToggleMenu;
