import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Footer = () => {
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleNewsletterSubmit = async () => {
    try {
      const response = await axios.post(
        "https://server-confiotes.fr/api/newsletters",
        {
          data: {
            userEmail: newsletterEmail,
          },
        }
      );
      setIsEmailSent(true);
      setNewsletterEmail("");
    } catch (error) {
      console.error("Erreur lors de la requête API :", error);

      // Log the response data if available
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  return (
    <div className="footer-container">
      <div className="left-side">
        <div className="title" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="contact">
          <div className="title-contact">Les Confiotes de Mamie</div>
          <div className="address-contact">
            <p>118 Av. de la République, </p>
            <p>83210 La Farlède</p>
          </div>
          <div className="mail-phone-contact">
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
          <div className="legal-mention">
            <p>
              <a
                href="https://server-confiotes.fr/uploads/cgv_21d216cfde.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                conditions générales de vente
              </a>{" "}
              | © Les Confiotes de Mamie - 2023
            </p>
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="nav">
          <h5>NAVIGATION :</h5>
          <ul>
            <li className="icon">
              <i className="nav-home">Accueil</i>
            </li>
            <li className="icon">
              <i className="nav-product" onClick={() => navigate("/products")}>
                Nos produits
              </i>
            </li>
            <li className="icon">
              <i className="nav-contact" onClick={() => navigate("/checkout")}>
                Panier
              </i>
            </li>
          </ul>
        </div>
        <div className="right-right-side">
          <div className="social-link">
            <h5>NOS RESEAUX :</h5>
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
          <div className="newsletter">
            <h5>
              NEWSLETTER
              <Tooltip content="Recevez nos offres spéciales et les dernières nouvelles en vous abonnant à notre newsletter !">
                <span className="tooltip-footer">
                  <i className="fa fa-info-circle"></i>
                </span>
              </Tooltip>{" "}
              :
            </h5>
            <div>
              {isEmailSent ? (
                <>
                  <input type="text" placeholder="Merci !" readOnly />
                  <i className="fa-solid fa-check"></i>
                </>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                  <i
                    className="fa-solid fa-paper-plane"
                    onClick={handleNewsletterSubmit}
                  ></i>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
