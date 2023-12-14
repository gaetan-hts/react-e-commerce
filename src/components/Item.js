import React, { useState } from "react";
import { addToCart } from "../state/cart.slice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Tooltip from "../components/Tooltip";

const Item = ({ id, url, name, price, weight, item, available }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ item: { ...item, count }, count }));
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      setCount(1);
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="item-container">
      <Link to={`/item/${id}`} onClick={scrollToTop}>
        <div className="img">
          <img src={"https://server-confiotes.fr" + url} alt={name} />
        </div>
      </Link>
      <div className="title-container">
        <h3>{name}</h3>
        <div className="weight">
          <p>
            {weight} {item.attributes.category === "Sirops" ? "cl" : "g"}
          </p>
        </div>
      </div>
      <div className="btn-container">
        <div className="price-qty-container">
          <div className="qty-btn-container">
            <div className="qty-btn">
              <i
                className="fa-solid fa-minus"
                onClick={() => {
                  if (count > 1) {
                    setCount(count - 1);
                  }
                }}
              ></i>
            </div>
            <div className="quantity">{count}</div>
            <div className="qty-btn">
              <i
                className="fa-solid fa-plus"
                onClick={() => setCount(count + 1)}
              ></i>
            </div>
          </div>
          <p className="price">{price.toFixed(2)} €</p>
        </div>
        {available ? (
          <button
            className={`cart-btn ${addedToCart ? "added" : ""}`}
            onClick={handleAddToCart}
          >
            {addedToCart ? (
              <>
                Ajouté !<i className="fa-solid fa-check"></i>
              </>
            ) : (
              <>
                Ajouter <i className="fa-solid fa-cart-plus"></i>
              </>
            )}
          </button>
        ) : (
          <button className="cart-btn unavailable">
            Epuisé
            <Tooltip content="Nous travaillons avec des produits locaux et de saison, ce qui peut expliquer l'indisponibilité de certains produits. N'hésitez pas à nous contacter pour connaître les prochaines disponibilités.">
              <span className="tooltip">
                <i className="fa fa-info-circle"></i>
              </span>
            </Tooltip>
          </button>
        )}
      </div>
    </div>
  );
};

export default Item;
