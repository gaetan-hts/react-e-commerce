import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import CartMenu from "../components/CartMenu";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../state/cart.slice";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import ToggleMenu from "../components/ToggleMenu";

const Success = () => {
  const storedId = localStorage.getItem("storedId");
  const menuOpen = useSelector((state) => state.menu.isOpen);
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const successOrder = async () => {
      try {
        // Étape 1 : Récupérer la liste des commandes depuis l'API
        const res = await axios.get(`https://server-confiotes.fr/api/orders`);

        // Étape 2 : Trouver la commande correspondant à la stripeSessionId
        const matchingOrder = res.data.data.find(
          (order) => order.attributes.stripeId === storedId
        );

        if (matchingOrder) {
          // Étape 3 : Mettre à jour l'état de la commande
          const updateData = {
            ...matchingOrder.attributes,
            payed: true,
          };
          await axios.put(
            `https://server-confiotes.fr/api/orders/${matchingOrder.id}`,
            { data: updateData }
          );

          // Étape 4 : Récupérer la commande mise à jour
          const updatedOrderResponse = await axios.get(
            `https://server-confiotes.fr/api/orders/${matchingOrder.id}`
          );

          // Étape 5 : Mettre à jour l'état local avec la commande mise à jour
          setOrderData(updatedOrderResponse.data.data);
        } else {
          console.log("No matching order found.");
        }

        // Étape 9 : Nettoyer le stockage local et le panier
        localStorage.removeItem("cart");
        localStorage.removeItem("storedId");
        dispatch(clearCart());
      } catch (error) {
        // Gérer les erreurs
        console.error("Error updating order:", error);
      }
    };

    // Appeler la fonction pour déclencher le processus
    successOrder();
  }, [storedId, dispatch]);

  // Étape 8 : Envoyer l'e-mail (en dehors du useEffect, une seule fois)
  useEffect(() => {
    if (orderData) {
      const orderSummary = orderData?.attributes?.products
        .map((product) => {
          return `${product.name} (${product.count})`;
        })
        .join("\n");

      const mailData = {
        mailConfiotes: "lesconfiotesdemamie@gmail.com",
        mailCustomer: orderData?.attributes?.userData.email,
        objet: `Les Confiotes de Mamie - Commande N° ${orderData.id}`,
        content: `
          Bonjour ${orderData?.attributes?.userData?.username} ${
          orderData?.attributes?.userData?.lastname
        },

          Merci d'avoir choisi Les Confiotes de Mamie ! Nous avons bien reçu votre commande n°${
            orderData.id
          } d'un montant de ${orderData?.attributes?.price.toFixed(2)}€.

          Récapitulatif de votre commande :
          ${orderSummary}

          Votre commande sera traitée dans les plus brefs délais (24h-48h). Vous recevrez un e-mail de confirmation d'expédition de la part du transporteur une fois que votre colis sera en route.

          Si vous avez des questions ou besoin d'une facture, n'hésitez pas à nous contacter à l'adresse lesconfiotesdemamie@gmail.com ou par téléphone au 06 46 41 31 59.

          Nous vous remercions de votre confiance.

          Bien cordialement,
          L'équipe des Confiotes de Mamie
        `,
      };

      // Étape 8 : Envoyer l'e-mail
      axios
        .post("https://server-confiotes.fr/api/emails", mailData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          console.log("Email sent.");
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    }
  }, [orderData]);

  return (
    <>
      <div className="success-page">
        <Navbar />
        <CartMenu />
        <div
          className="success-container
        "
        >
          <h2>Confirmation de commande :</h2>
          <div className="order-confirmation-container">
            <i class="fa-solid fa-check"></i>
            <div className="message-container">
              <h3>Merci pour votre commande !</h3>
              <p>
                Nous avons bien reçu votre commande, un email de confirmation va
                vous être envoyé avec les détails de cette dernière.
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

export default Success;
