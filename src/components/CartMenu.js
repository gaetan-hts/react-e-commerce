import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../state/cart.slice";
import { useNavigate } from "react-router-dom";

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);
  const leftForFreeFee = 65 - totalPrice;

  return (
    <div
      className={isCartOpen ? "cart-container open" : "cart-container close"}
    >
      <div
        className="left-side"
        onClick={() => dispatch(setIsCartOpen({}))}
      ></div>
      <div className="cart-menu">
        <div className="cart-header">
          <h3>PANNIER ({cart.length})</h3>
          <i
            className="fa-solid fa-arrow-right-from-bracket"
            onClick={() => dispatch(setIsCartOpen({}))}
          ></i>
        </div>
        <hr class="separator-line"></hr>
        {cart.length <= 0 && (
          <div className="empty-cart">
            Votre panier est vide.
            <button
              onClick={() => {
                dispatch(setIsCartOpen({}));
                navigate("/products");
              }}
            >
              voir nos produits
            </button>
          </div>
        )}
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-list-container" key={item.id}>
              <div className="img-container">
                <img
                  src={
                    "https://server-confiotes.fr" +
                    item?.attributes?.image?.data?.attributes?.url
                  }
                  alt={item?.attributes?.name}
                />
              </div>
              <div className="details-container">
                <div className="title-container">
                  <h4 className="title">{item?.attributes?.name}</h4>
                  <i
                    className="fa-solid fa-xmark"
                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                  ></i>
                </div>
                <div className="qty-container">
                  <div className="qty-btn-container">
                    <div className="qty-btn">
                      <i
                        className="fa-solid fa-minus"
                        onClick={() => dispatch(decreaseCount({ id: item.id }))}
                      ></i>
                    </div>
                    <div className="quantity">{item?.count}</div>
                    <div className="qty-btn">
                      <i
                        className="fa-solid fa-plus"
                        onClick={() => dispatch(increaseCount({ id: item.id }))}
                      ></i>
                    </div>
                  </div>
                  <div className="price">
                    {item?.attributes?.price?.toFixed(2)} €
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="subtotal">
            <h4>Sous-total</h4>
            <div className="total-price">{totalPrice.toFixed(2)} €</div>
          </div>
          <div className="free-shipping">
            {totalPrice && totalPrice >= 65 ? (
              <h5>Livraison offerte !</h5>
            ) : (
              cart.length > 0 && (
                <h5>
                  Plus que{" "}
                  <strong>{totalPrice && leftForFreeFee.toFixed(2)} € </strong>
                  pour bénéficier de la livraison gratuite.
                </h5>
              )
            )}
          </div>
          <div className="btn-container">
            <button
              className="exit-cart"
              onClick={() => dispatch(setIsCartOpen({}))}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
            <button
              className="checkout"
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              Passer commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
