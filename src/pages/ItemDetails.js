import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Item from "../components/Item";
import { addToCart } from "../state/cart.slice";
import Navbar from "../components/Navbar";
import CartMenu from "../components/CartMenu";
import Footer from "../components/Footer";
import FixedCart from "../components/FixedCart";
import ToggleMenu from "../components/ToggleMenu";
import Tooltip from "../components/Tooltip";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const menuOpen = useSelector((state) => state.menu.isOpen);
  const { itemId } = useParams();
  const [count, setCount] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [item, setItem] = useState();
  const [items, setItems] = useState([]);
  const [nutriValues, setNutriValues] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://server-confiotes.fr/api/items?pagination[page]=1&pagination[pageSize]=100&populate=*"
      )
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://server-confiotes.fr/api/items/${itemId}?populate=*`)
      .then((res) => {
        console.log(res.data.data);
        setItem(res.data.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [itemId]);

  const handleAddToCart = () => {
    dispatch(addToCart({ item: { ...item, count }, count }));
    setAddedToCart(true);

    // Réinitialise l'état après 2 secondes
    setTimeout(() => {
      setAddedToCart(false);
      setCount(1);
    }, 2000);
  };

  return (
    <div className="item-details-page">
      <Navbar />
      <div className="bg-img"></div>
      <CartMenu />
      <div className="item-details-container">
        <div className="image-container">
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={
              "https://server-confiotes.fr" +
              item?.attributes?.image?.data?.attributes?.url
            }
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="details-container">
          <div className="details">
            <h3>{item?.attributes?.name}</h3>
            <p className="price">{item?.attributes?.price.toFixed(2)} €</p>
            <p
              className="description"
              dangerouslySetInnerHTML={{
                __html: item?.attributes?.description,
              }}
            />
            <div className="nutri-values-container">
              <p
                className="toggle-btn"
                onClick={() => setNutriValues(!nutriValues)}
              >
                Valeurs nutritionelles{" "}
                {nutriValues ? (
                  <i class="fa-solid fa-chevron-up"> </i>
                ) : (
                  <i class="fa-solid fa-chevron-down"></i>
                )}
              </p>
              <p
                className={`toggle-text ${nutriValues ? "show" : "hide"}`}
                dangerouslySetInnerHTML={{
                  __html: item?.attributes?.nutriValues,
                }}
              />
            </div>
            <p>
              {item?.attributes?.weight}{" "}
              {item?.attributes?.category === "Sirops" ? "cl" : "g"}
            </p>
          </div>
          <div>
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
            {item?.attributes?.available ? (
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
                Indisponible
                <Tooltip content="Nous travaillons avec des produits locaux et de saison, ce qui peut expliquer l'indisponibilité de certains produits. N'hésitez pas à nous contacter pour connaître les prochaines disponibilités.">
                  <span className="tooltip">
                    <i className="fa fa-info-circle"></i>
                  </span>
                </Tooltip>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="related-container">
        <h3 className="related-title">Autres gourmandises :</h3>
        <div className="related-items">
          {items &&
            items
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((item) => (
                <Item
                  item={item}
                  id={item?.id}
                  key={item?.id}
                  url={item?.attributes?.image?.data?.attributes?.url}
                  name={item?.attributes?.name}
                  price={item?.attributes?.price}
                  weight={item?.attributes?.weight}
                  available={item?.attributes?.available}
                />
              ))}
        </div>
      </div>
      <FixedCart />
      {menuOpen ? <ToggleMenu menuOpen={menuOpen} /> : ""}
      <Footer />
    </div>
  );
};

export default ItemDetails;
