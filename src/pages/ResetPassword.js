import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FixedCart from "../components/FixedCart";

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setResetError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post(
        "https://server-confiotes.fr/api/auth/reset-password",
        {
          code: code,
          password: newPassword,
          passwordConfirmation: confirmPassword,
        }
      );
      console.log("Le mot de passe de l'utilisateur a été réinitialisé.");
      // Rediriger vers la page de connexion ou afficher un message de succès.
    } catch (error) {
      console.log("Une erreur est survenue:", error.response);
      // Afficher un message d'erreur à l'utilisateur.
    }
  };

  useEffect(() => {
    if (!code) {
      // Code non présent dans les paramètres de requête
      // Gérer l'erreur ou rediriger l'utilisateur si nécessaire
    }
  }, [code]);

  return (
    <div>
      <Navbar />
      <h2>Réinitialisation du mot de passe</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>Nouveau mot de passe:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirmer le mot de passe:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {resetError && <p>{resetError}</p>}
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
      <FixedCart />
      <Footer />
    </div>
  );
};

export default ResetPassword;
