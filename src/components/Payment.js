import React, { useState } from "react";
import axios from "axios";
import { useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

const Payment = ({
  shippingFee,
  userData,
  isFormValid,
  newsletter,
  isCgvChecked,
  isEmailValid,
  shippingMethod,
  discountAmount,
}) => {
  const stripe = useStripe();
  const finalPrice = useSelector((state) => state.cart.finalPrice);
  const products = useSelector((state) => state.cart.cart);
  const [errorMessage, setErrorMessage] = useState(null);
  const discount = discountAmount > 0 ? true : false;
  const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
  const stripePromise = loadStripe(stripeKey);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setErrorMessage(
        "Veuillez remplir tous les champs avant de procéder au paiement."
      );
    } else if (!isCgvChecked) {
      setErrorMessage("Veuillez accepter les conditions générales de vente.");
    } else if (!isEmailValid) {
      setErrorMessage("Veuillez fournir une adresse email valide.");
    } else {
      try {
        const stripe = await stripePromise;
        const res = await axios.post("https://server-confiotes.fr/api/orders", {
          userData: userData,
          price: finalPrice,
          shippingFee: shippingFee,
          shippingMethod: shippingMethod,
          discount: discount,
          products: products.map(({ id, count, attributes }) => ({
            id,
            count,
            name: attributes?.name,
          })),
        });

        if (newsletter) {
          try {
            const response = await axios.post(
              "https://server-confiotes.fr/api/newsletters",
              {
                data: {
                  userEmail: userData.email,
                },
              }
            );
          } catch (error) {
            console.error("Erreur lors de la requête API :", error);

            // Log the response data if available
            if (error.response) {
              console.error("Response data:", error.response.data);
            }
          }
        }

        const { stripeSession } = res.data;
        localStorage.setItem("storedId", stripeSession.id);
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          alert(result.error.message);
        }
      } catch (err) {
        console.log(err);
        setErrorMessage("Le paiement a échoué. Veuillez réessayer.");
      } finally {
        // Reset error message after successful submission
        setErrorMessage("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit" className="payment-btn" disabled={!stripe}>
        Paiement
      </button>
    </form>
  );
};

export default Payment;
