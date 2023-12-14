import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import CartMenu from "../components/CartMenu";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import FixedCart from "../components/FixedCart";
import ToggleMenu from "../components/ToggleMenu";
import { useSelector } from "react-redux";

const User = () => {
  const navigate = useNavigate();
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const menuOpen = useSelector((state) => state.menu.isOpen);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    city: "",
    postCode: "",
    phone: "",
  });
  const [userId, setUserId] = useState("");
  // State variables to control edit modes
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingCity, setIsEditingCity] = useState(false);
  const [isEditingPostCode, setIsEditingPostCode] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  useEffect(() => {
    const checkAuthToken = () => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        navigate("/auth");
      }
    };
    checkAuthToken();
  }, [jwt]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://server-confiotes.fr/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        const {
          username,
          lastname,
          email,
          password,
          address,
          city,
          postCode,
          phone,
          id,
        } = response.data;
        setUserData({
          username,
          lastname,
          email,
          password,
          address,
          city,
          postCode,
          phone,
        });
        setUserId(id);
      } catch (error) {
        console.log(
          "Une erreur est survenue lors de la récupération des informations utilisateur :",
          error
        );
      }
    };

    fetchUserData();
  }, []);

  console.log(userData);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("cart");
    navigate("/");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      await axios.put(
        `https://server-confiotes.fr/api/users/${userId}`,
        {
          address: userData.address,
          city: userData.city,
          postCode: userData.postCode,
          phone: userData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      setIsEditingAddress(false);
      setIsEditingCity(false);
      setIsEditingPostCode(false);
      setIsEditingPhone(false);

      console.log("Champs utilisateur modifiés avec succès !");
      alert("Les modifications ont bien été prises en compte.");
    } catch (error) {
      console.log(
        "Une erreur est survenue lors de la modification des champs utilisateur :",
        error
      );
    }
  };

  return (
    <div className="user-page">
      <Navbar />
      <div className="bg-img"></div>
      <div className="user-container">
        <h2>Informations Utilisateur</h2>
        <div className="user-info">
          <div className="info">
            <label htmlFor="username">Prénom :</label>
            <span>{userData.username || ""}</span>
          </div>
          <div className="info">
            <label htmlFor="lastname">Nom :</label>
            <span>{userData.lastname || ""}</span>
          </div>
          <div className="info">
            <label htmlFor="email">Adresse e-mail :</label>
            <span>{userData.email || ""}</span>
          </div>
          <div className="info">
            <label htmlFor="password">Mot de passe :</label>
            <div className="password-container">
              <p>••••••••••••</p>
              <button onClick={() => navigate("/forgot-password")}>
                Modifier le mot de passe
              </button>
            </div>
          </div>
        </div>
        <h3>Coordonnées</h3>
        <div className="contact-details">
          <div className="info">
            <label htmlFor="address">Adresse :</label>
            <div className="editable-input">
              {isEditingAddress ? (
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="input"
                  value={userData.address}
                  onChange={(e) => handleInputChange(e, "address")}
                />
              ) : (
                <span>{userData.address}</span>
              )}
              {isEditingAddress ? (
                <button onClick={handleFormSubmit}>Enregister</button>
              ) : (
                <button onClick={() => setIsEditingAddress(!isEditingAddress)}>
                  Modifier
                </button>
              )}
            </div>
          </div>
          <div className="info">
            <label htmlFor="city">Ville :</label>
            <div className="editable-input">
              {isEditingCity ? (
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="input"
                  value={userData.city}
                  onChange={(e) => handleInputChange(e, "city")}
                />
              ) : (
                <span>{userData.city}</span>
              )}
              {isEditingCity ? (
                <button onClick={handleFormSubmit}>Enregister</button>
              ) : (
                <button onClick={() => setIsEditingCity(!isEditingCity)}>
                  Modifier
                </button>
              )}
            </div>
          </div>
          <div className="info">
            <label htmlFor="postCode">Code postal :</label>
            <div className="editable-input">
              {isEditingPostCode ? (
                <input
                  type="text"
                  id="postCode"
                  name="postCode"
                  className="input"
                  value={userData.postCode}
                  onChange={(e) => handleInputChange(e, "postCode")}
                />
              ) : (
                <span>{userData.postCode}</span>
              )}
              {isEditingPostCode ? (
                <button onClick={handleFormSubmit}>Enregister</button>
              ) : (
                <button
                  onClick={() => setIsEditingPostCode(!isEditingPostCode)}
                >
                  Modifier
                </button>
              )}
            </div>
          </div>
          <div className="info">
            <label htmlFor="phone">Numéro de téléphone :</label>
            <div className="editable-input">
              {isEditingPhone ? (
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  className="input"
                  onChange={(e) => handleInputChange(e, "phone")}
                />
              ) : (
                <span>{userData.phone}</span>
              )}
              {isEditingPhone ? (
                <button onClick={handleFormSubmit}>Enregister</button>
              ) : (
                <button onClick={() => setIsEditingPhone(!isEditingPhone)}>
                  Modifier
                </button>
              )}
            </div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
      <CartMenu />
      <FixedCart />
      {menuOpen ? <ToggleMenu menuOpen={menuOpen} /> : ""}
      <Footer />
    </div>
  );
};

export default User;
