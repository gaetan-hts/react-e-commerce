import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import CartMenu from "../components/CartMenu";
import Footer from "../components/Footer";
import FixedCart from "../components/FixedCart";
import { useSelector } from "react-redux";
import ToggleMenu from "../components/ToggleMenu";

const Auth = () => {
  const navigate = useNavigate();
  const menuOpen = useSelector((state) => state.menu.isOpen);
  const [logInData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signInData, setSignInData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    postCode: "",
    phone: "",
  });
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const phoneRegex = /^\d{10}$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError(false);
    try {
      const response = await axios.post(
        "https://server-confiotes.fr/api/auth/local",
        {
          identifier: logInData.email,
          password: logInData.password,
        }
      );
      localStorage.setItem("jwt", response.data.jwt);
      navigate("/user");
    } catch (error) {
      console.log("An error occurred:", error.response);

      if (error.response.status === 400 || error.response.status === 401) {
        // Erreur 400 ou 401 signifie que les identifiants sont incorrects
        // Afficher un message d'erreur à l'utilisateur
        setLoginError(true);
        setLoginErrorMessage("Identifiants incorrects. Veuillez réessayer.");
      }
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setEmailError(false);

    if (signInData.password !== signInData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    if (!phoneRegex.test(signInData.phone)) {
      setPhoneError(true);
      return;
    }

    try {
      const response = await axios.post(
        "https://server-confiotes.fr/api/auth/local/register",
        {
          name: signInData.name,
          lastname: signInData.lastname,
          email: signInData.email,
          password: signInData.password,
          address: signInData.address,
          city: signInData.city,
          postCode: signInData.postCode,
          phone: signInData.phone,
        }
      );
      localStorage.setItem("jwt", response.data.jwt);
      navigate("/user");
    } catch (error) {
      console.log("Une erreur est survenue :", error.response);

      if (error.response.status === 400) {
        // Erreur 400 signifie que l'adresse e-mail existe déjà
        // Afficher un message d'erreur à l'utilisateur
        setEmailError(true);
        setErrorMessage("Cette adresse e-mail est déjà utilisée.");
      }
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      <CartMenu />
      <div className="bg-img"></div>
      <div className="auth-container">
        <form onSubmit={handleLogin}>
          <h2>Connexion</h2>
          <div>
            <input
              type="email"
              id="login-email"
              username="login-email"
              placeholder="Adresse email"
              value={logInData.email}
              onChange={(e) =>
                setLoginData({ ...logInData, email: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              username="password"
              placeholder="Mot de passe"
              value={logInData.password}
              onChange={(e) =>
                setLoginData({ ...logInData, password: e.target.value })
              }
            />
          </div>
          <p
            className="forgotten-password"
            onClick={() => navigate("/forgot-password")}
          >
            Mot de passe oublié ?
          </p>
          <button type="submit">Se connecter</button>
          {loginError && <p className="error-message">{loginErrorMessage}</p>}
        </form>
        <form onSubmit={handleSignin}>
          <h2>Inscription</h2>
          <div className="fullname-container">
            <input
              type="text"
              id="name"
              placeholder="Prénom"
              username="name"
              value={signInData.name}
              onChange={(e) =>
                setSignInData({ ...signInData, name: e.target.value })
              }
            />
            <div></div>
            <input
              type="text"
              id="lastname"
              placeholder="Nom"
              username="lastname"
              value={signInData.lastname}
              onChange={(e) =>
                setSignInData({ ...signInData, lastname: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="email"
              id="signin-email"
              placeholder="Adresse email"
              username="signin-email"
              value={signInData.email}
              onChange={(e) =>
                setSignInData({ ...signInData, email: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Mot de passe"
              username="password"
              value={signInData.password}
              onChange={(e) =>
                setSignInData({ ...signInData, password: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirmer le mot de passe"
              username="confirmPassword"
              value={signInData.confirmPassword}
              onChange={(e) =>
                setSignInData({
                  ...signInData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
          <div>
            <input
              type="text"
              id="address"
              placeholder="Adresse"
              username="address"
              value={signInData.address}
              onChange={(e) =>
                setSignInData({ ...signInData, address: e.target.value })
              }
            />
          </div>
          <div className="city-postcode-container">
            <input
              type="text"
              id="city"
              placeholder="Ville"
              username="city"
              value={signInData.city}
              onChange={(e) =>
                setSignInData({ ...signInData, city: e.target.value })
              }
            />
            <div></div>
            <input
              type="text"
              id="postCode"
              placeholder="Code postal"
              username="postCode"
              value={signInData.postCode}
              onChange={(e) =>
                setSignInData({ ...signInData, postCode: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              id="phone"
              placeholder="Numéro de téléphone"
              username="phone"
              value={signInData.phone}
              onChange={(e) =>
                setSignInData({ ...signInData, phone: e.target.value })
              }
            />
          </div>
          {emailError && <p className="error-message">{errorMessage}</p>}
          {passwordMatchError && (
            <p className="error-message">
              Les mots de passe ne correspondent pas.
            </p>
          )}
          {phoneError && (
            <p className="error-message">
              Veuillez saisir un numéro de téléphone valide.
            </p>
          )}
          <button type="submit">S'inscrire</button>
        </form>
      </div>
      <FixedCart />
      {menuOpen ? <ToggleMenu menuOpen={menuOpen} /> : ""}
      <Footer />
    </div>
  );
};

export default Auth;
