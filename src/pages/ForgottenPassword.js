import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [resetRequestSent, setResetRequestSent] = useState(false);
  const [resetError, setResetError] = useState("");

  const handleResetPasswordRequest = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://server-confiotes.fr/api/auth/forgot-password",
        {
          email: email,
        }
      );
      console.log("Votre utilisateur a reçu un e-mail");
      setResetRequestSent(true);
    } catch (error) {
      console.log("Une erreur est survenue:", error.response);
      setResetError(
        "Une erreur est survenue lors de la demande de réinitialisation du mot de passe."
      );
    }
  };

  return (
    <>
      <div className="forgot-password-page">
        <Navbar />
        <div className="form-container">
          <h2>Réinitialisation du mot de passe</h2>
          {!resetRequestSent ? (
            <form onSubmit={handleResetPasswordRequest}>
              <div className="input-container">
                <label>Adresse e-mail:</label>
                <input
                  placeholder="Adresse Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {resetError && <p>{resetError}</p>}
              <button type="submit">Envoyer</button>
            </form>
          ) : (
            <p>
              Un e-mail de réinitialisation du mot de passe a été envoyé à
              l'adresse {email}. Veuillez vérifier votre boîte de réception.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgottenPassword;
