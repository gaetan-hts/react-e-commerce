import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Payment from "./Payment";
import { setCurrentStep } from "../state/cart.slice";

const Shipping = ({
  shippingFee,
  shippingMethod,
  totalPrice,
  finalPrice,
  scrollToTop,
}) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    postCode: "",
    phone: "",
  });

  const [isFormValid, setIsFormValid] = useState(true);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [isCgvChecked, setIsCgvChecked] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const validateEmail = (email) => {
    // Fonction de validation d'e-mail simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "email") {
      setIsEmailValid(validateEmail(value));
    }
  };

  useEffect(() => {
    const isValid = Object.values(userData || {}).every(
      (value) => value && value.trim() !== ""
    );
    setIsFormValid(isValid);
  }, [userData, isCgvChecked]);

  return (
    <div className="shipping-container">
      <div className="form-container">
        <form>
          <h3>Livraison</h3>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Prénom"
            required
          />
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            placeholder="Nom"
            required
          />

          <input
            type="text"
            id="address"
            name="address"
            value={userData.address}
            onChange={handleChange}
            placeholder="Adresse"
            required
          />
          <input
            type="text"
            id="city"
            name="city"
            value={userData.city}
            onChange={handleChange}
            placeholder="Ville"
            required
          />
          <input
            type="text"
            id="postCode"
            name="postCode"
            value={userData.postCode}
            onChange={handleChange}
            placeholder="Code postal"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Adresse email"
            required
          />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            placeholder="Téléphone"
            required
          />
          <div className="checkbox-container">
            <div className="newsletter">
              <input
                type="checkbox"
                checked={subscribeNewsletter}
                onChange={() => setSubscribeNewsletter(!subscribeNewsletter)}
              />
              <p>
                Envoyez-moi les nouvelles et offres par e-mail (Vos données ne
                seront utilisées que dans le cadre de notre service et ne seront
                en aucun cas partagées avec des tiers).
              </p>
            </div>
            <div className="cgv">
              <input
                type="checkbox"
                checked={isCgvChecked}
                onChange={() => setIsCgvChecked(!isCgvChecked)}
              />
              <p>
                Je déclare avoir pris connaissance des{" "}
                <a
                  href="https://server-confiotes.fr/uploads/cgv_21d216cfde.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  conditions générales de vente
                </a>{" "}
                et les accepter sans réserve.
              </p>
            </div>
          </div>
        </form>
        <div className="btn-container">
          <button
            className="back-btn"
            onClick={() => {
              scrollToTop();
              dispatch(setCurrentStep(1));
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <Payment
            userData={userData}
            shippingFee={shippingFee}
            isFormValid={isFormValid}
            newsletter={subscribeNewsletter}
            isEmailValid={isEmailValid}
            isCgvChecked={isCgvChecked}
            shippingMethod={shippingMethod}
          />
        </div>
      </div>
      <div className="recap-container">
        <div className="recap-title-container">
          <h3>Récapitulatif</h3>
        </div>
        <div className="cart-list">
          {cart.map((item) => (
            <div className="item-container" key={item.id}>
              <div className="title-container">
                <h4 className="title">{item?.attributes?.name}</h4>
                <p className="weight">
                  {item?.attributes?.weight}{" "}
                  {item.attributes.category === "Sirops" ? "cl" : "g"}
                </p>
              </div>
              <div className="price-container">
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
        </div>
        <div className="total-container">
          <div className="subtotal">
            <h4>Sous-total</h4>
            <div>{totalPrice && totalPrice.toFixed(2)} €</div>
          </div>
          <div className="shipping-fees">
            <h5>Frais de livraison</h5>
            <div>{shippingFee} €</div>
          </div>
          <div className="total">
            <h4>Total</h4>
            <div>{finalPrice && finalPrice.toFixed(2)} €</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
