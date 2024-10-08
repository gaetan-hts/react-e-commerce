import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setShippingMethod,
  setFinalPrice,
  setCurrentStep,
  addToCart,
} from "../state/cart.slice";
import { Elements } from "@stripe/react-stripe-js";
import Shipping from "../components/Shipping";
import { loadStripe } from "@stripe/stripe-js";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";

const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripeKey);

const shippingMethod = ["relay", "home", "shop"];
const promoCodes = ["COSMEDI2K24", "NAVALCONF2K24"];

const CartValidation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const finalPrice = useSelector((state) => state.cart.finalPrice);
  const currentStep = useSelector((state) => state.cart.currentStep);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(
    shippingMethod[0]
  );
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeError, setPromoCodeError] = useState("");
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleShippingChange = (event) => {
    const newShippingMethod = event.target.value;
    setSelectedShippingMethod(newShippingMethod);
    dispatch(setShippingMethod(newShippingMethod));
  };

  const handlePromoCodeChange = (event) => {
    const newPromoCode = event.target.value;
    setPromoCode(newPromoCode);
    setIsButtonDisabled(false);
    setPromoCodeError("");
    setPromoCodeApplied(false);
    setIsButtonDisabled(newPromoCode === "");
  };

  const applyPromoCode = () => {
    if (!promoCodeApplied && promoCodes.includes(promoCode)) {
      const discountedPrice = finalPrice * 0.85;
      dispatch(setFinalPrice(discountedPrice));
      setPromoCodeApplied(true);
      setPromoCodeError("");
      setIsButtonDisabled(true);
    } else {
      setPromoCodeError("Code promotionnel invalide");
      setPromoCodeApplied(false);
    }
  };

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.count * item.attributes.price,
      0
    );
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (promoCodeApplied) {
      return totalPrice * 0.15;
    } else {
      return 0;
    }
  }, [totalPrice, promoCodeApplied]);

  const shippingFee = useMemo(() => {
    if (totalPrice > 65) {
      return 0;
    } else {
      switch (selectedShippingMethod) {
        case "relay":
          return 5.9;
        case "home":
          return 9.9;
        case "shop":
          return 0;
        default:
          return 0;
      }
    }
  }, [totalPrice, selectedShippingMethod]);

  useEffect(() => {
    dispatch(setFinalPrice(totalPrice + shippingFee - discountAmount));
  }, [selectedShippingMethod, totalPrice, shippingFee, promoCodeApplied]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const leftForFreeFee = 65 - totalPrice;

  return (
    <div className="cartValidation-page">
      <ProgressBar currentStep={currentStep} />
      {currentStep === 1 ? (
        <>
          <div className="header">
            <h3>Votre panier ({cart.length}) </h3>
          </div>
          {cart.length <= 0 && (
            <div className="empty-cart">
              Votre panier est vide.
              <button onClick={() => navigate("/products")}>
                voir nos produits
              </button>
            </div>
          )}
          <div className="cart-list">
            {cart.map((item) => (
              <div className="item-container" key={item.id}>
                <div className="img-container">
                  <img
                    src={
                      "https://server-confiotes.fr" +
                      item?.attributes?.image?.data?.attributes?.url
                    }
                    alt={item?.attributes?.name}
                    onClick={() => navigate(`/item/${item.id}`)}
                  />
                </div>
                <div className="title-container">
                  <h4 className="title">{item?.attributes?.name}</h4>
                  <p className="weight">
                    {item?.attributes?.weight}{" "}
                    {item.attributes.category === "Sirops" ? "cl" : "g"}
                  </p>
                  <div className="qty-container">
                    <i
                      className="fa-solid fa-minus"
                      onClick={() => dispatch(decreaseCount({ id: item.id }))}
                    ></i>
                    <div className="quantity">{item?.count}</div>
                    <i
                      className="fa-solid fa-plus"
                      onClick={() => dispatch(increaseCount({ id: item.id }))}
                    ></i>
                  </div>
                </div>
                <div className="price-container">
                  <i
                    className="fa-solid fa-xmark"
                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                  ></i>
                  <div className="price">
                    <p className="unit-price">
                      {item?.count} x {item?.attributes?.price.toFixed(2)} €
                    </p>
                    <p className="total-item">
                      Total :{" "}
                      {item?.attributes?.price &&
                        item?.count &&
                        (item?.attributes?.price * item?.count).toFixed(2)}{" "}
                      €
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="shipping-options">
              <h3>Choisissez le mode livraison :</h3>
              <div
                className={`option ${
                  selectedShippingMethod === "relay" ? "selected" : ""
                }`}
                onChange={handleShippingChange}
              >
                <label>
                  <div>
                    Livraison en point relai - 5,90€{" "}
                    <Tooltip content="Nous choisirons le point relai le plus avantageux en fonction de son emplacement et de ses horaires.">
                      <span className="tooltip">
                        <i className="fa fa-info-circle"></i>
                      </span>
                    </Tooltip>
                  </div>
                  <input
                    type="radio"
                    name="shipping"
                    value="relay"
                    checked={selectedShippingMethod === "relay"}
                    onChange={handleShippingChange}
                  />
                </label>
              </div>
              <div
                className={`option ${
                  selectedShippingMethod === "home" ? "selected" : ""
                }`}
                onChange={handleShippingChange}
              >
                <label>
                  Livraison à domicile - 9,90€
                  <input
                    type="radio"
                    name="shipping"
                    value="home"
                    checked={selectedShippingMethod === "home"}
                    onChange={handleShippingChange}
                  />
                </label>
              </div>
              <div
                className={`option ${
                  selectedShippingMethod === "shop" ? "selected" : ""
                }`}
                onChange={handleShippingChange}
              >
                <label>
                  <div>
                    Récupérer ma commande directement en magasin - 0€
                    <Tooltip content="Nous vous préviendrons une fois votre commande disponible !">
                      <span className="tooltip">
                        <i className="fa fa-info-circle"></i>
                      </span>
                    </Tooltip>
                  </div>
                  <input
                    type="radio"
                    name="shipping"
                    value="shop"
                    checked={selectedShippingMethod === "shop"}
                    onChange={handleShippingChange}
                  />
                </label>
              </div>
            </div>
            <div className="promo-code">
              <h3>Code promotionnel :</h3>
              <div className="promoCode-input-container">
                <input
                  type="text"
                  placeholder="Entrez votre code promo"
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                  className={promoCodeApplied ? "input-promoCode-applied" : ""}
                />
                <button
                  onClick={applyPromoCode}
                  className={promoCodeApplied ? "promoCode-applied" : ""}
                  disabled={isButtonDisabled}
                >
                  {promoCodeApplied ? (
                    <>
                      <p>Ajouté </p> <i className="fa-solid fa-check"></i>
                    </>
                  ) : (
                    "Appliquer"
                  )}
                </button>
              </div>
              {promoCodeError && <div className="error">{promoCodeError}</div>}
            </div>
            <div className="subtotal">
              <h4>Sous-total</h4>
              <div>{totalPrice && totalPrice.toFixed(2)} €</div>
            </div>
            {promoCodeApplied && (
              <div className="discount">
                <h5>Code promotionnel (-15%)</h5>
                <div>- {discountAmount.toFixed(2)} €</div>
              </div>
            )}
            <div className="shipping-fees">
              {totalPrice && totalPrice >= 65 ? (
                <h5>Livraison offerte</h5>
              ) : (
                <h5>
                  Frais de livraison - (Plus que{" "}
                  <strong>{totalPrice && leftForFreeFee.toFixed(2)} € </strong>
                  pour bénéficier de la livraison gratuite)
                </h5>
              )}

              <div>{shippingFee && shippingFee.toFixed(2)} €</div>
            </div>
            <div className="total">
              <h4>Total</h4>
              <div>{finalPrice && finalPrice.toFixed(2)} €</div>
            </div>
          </div>
          <button
            className="checkout"
            onClick={() => {
              if (cart.length > 0) {
                scrollToTop();
                dispatch(setCurrentStep(2));
              }
            }}
          >
            Valider
          </button>
        </>
      ) : (
        <Elements stripe={stripePromise}>
          <Shipping
            shippingFee={shippingFee}
            shippingMethod={selectedShippingMethod}
            totalPrice={totalPrice}
            finalPrice={finalPrice}
            scrollToTop={scrollToTop}
            promoCodeApplied={promoCodeApplied}
            discountAmount={discountAmount}
          />
        </Elements>
      )}
    </div>
  );
};

export default CartValidation;
