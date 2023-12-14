import React, { useEffect, useState } from "react";
import Item from "../components/Item";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchTerm, setSearchTerm } from "../state/search.slice";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartMenu from "../components/CartMenu";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import FixedCart from "../components/FixedCart";
import ToggleMenu from "../components/ToggleMenu";
import fruits from "../assets/img/fruit.png";
import marmite from "../assets/img/marmite 2.png";
import truck from "../assets/img/truck.png";

const categories = ["Tout", "Confitures", "Tapas", "Sirops"];

const Products = () => {
  const searchTerm = useSelector((state) => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuOpen = useSelector((state) => state.menu.isOpen);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [showAdditionalTextFruits, setShowAdditionalTextFruits] =
    useState(false);
  const [showAdditionalTextTruck, setShowAdditionalTextTruck] = useState(false);
  const [showAdditionalTextMarmite, setShowAdditionalTextMarmite] =
    useState(false);

  useEffect(() => {
    axios
      .get(
        "https://server-confiotes.fr/api/items?pagination[page]=1&pagination[pageSize]=100&populate=*"
      )
      .then((res) => {
        setItems(res.data);
        setCurrentPage(1);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [selectedCategory]);

  const currentItems = items.data
    ? items.data
        .filter(
          (item) =>
            selectedCategory === "Tout" ||
            item.attributes.category.includes(selectedCategory)
        )
        .filter(
          (item) =>
            (selectedCategory === "Tout" ||
              item.attributes.category.includes(selectedCategory)) &&
            item.attributes.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
    : [];

  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentPosts = currentItems.slice(indexOfFirstItem, indexOfLastItem);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="item-list-page">
      <Navbar />
      <div className="bg-img"></div>
      <div className="products-header">
        <h2>Pourquoi choisir nos produits ?</h2>
        <div className="good-choice-container">
          <div className="good-choice">
            <img src={fruits} alt="fruits" className="fruits" />
            <div>
              <p>+ de fruits et – de sucre !</p>
              <br />
              <div
                className="read-more-btn"
                onClick={() =>
                  setShowAdditionalTextFruits(!showAdditionalTextFruits)
                }
              >
                <p>{showAdditionalTextFruits ? "lire moins" : "lire plus"}</p>
                <i
                  className={
                    showAdditionalTextFruits
                      ? "fa-solid fa-circle-arrow-up"
                      : "fa-solid fa-circle-arrow-down"
                  }
                ></i>
                <br />
                <br />
              </div>

              {showAdditionalTextFruits && (
                <div>
                  <p className="additional-text">
                    Pour tout le monde nous vendons des confitures. Or, chez Les
                    Confiotes de Mamie, nous proposons beaucoup de « préparation
                    artisanale de fruits  » <br />
                    <br />
                    Il est possible que vous ne le sachiez pas, mais la
                    confiture est soumise à des normes strictes en ce qui
                    concerne les pourcentages de sucre et de fruits.
                    <br />
                    <br /> Elle doit contenir un minimum de 55% de sucre après
                    cuisson… Cette valeur inclut à la fois le sucre
                    naturellement présent dans le fruit et celui ajouté. Cette
                    norme va à l'encontre de ce que l'on pourrait penser,
                    surtout à une époque axée sur une alimentation plus saine !
                    Chez nous c’est entre 40% et 50% de sucre en moyenne !{" "}
                    <br />
                    <br />
                    Côté fruits, il faut un minimum de 35%. Nous cuisons nos
                    préparations dans de petit volume, afin de prendre soin
                    d’eux, et atteindre un taux entre 70% et 90% de fruits !
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="good-choice">
            <img src={truck} alt="truck" className="truck" />
            <div>
              <p>En collaboration avec nos producteurs locaux</p>
              <br />
              <div
                className="read-more-btn"
                onClick={() =>
                  setShowAdditionalTextTruck(!showAdditionalTextTruck)
                }
              >
                <p>{showAdditionalTextTruck ? "lire moins" : "lire plus"}</p>
                <i
                  className={
                    showAdditionalTextTruck
                      ? "fa-solid fa-circle-arrow-up"
                      : "fa-solid fa-circle-arrow-down"
                  }
                ></i>
                <br />
                <br />
              </div>

              {showAdditionalTextTruck && (
                <div>
                  <p className="additional-text">
                    L’activité de départ des Confiotes de Mamie est de proposer
                    un service de transformation aux producteurs locaux de notre
                    région (Var). Cela leurs permets d’éviter la perte d’une
                    partie de leur production, et de proposer un produit
                    transformé venant directement de leurs champs : les fraises
                    en saisons joignant la confiture de fraise et le sirop de
                    fraise ! Une grande volonté ANTI GASPI !
                    <br />
                    <br /> Nous travaillons un maximum{" "}
                    <strong>
                      en collaboration avec les producteurs locaux
                    </strong>{" "}
                    en leur achetant leurs fruits et légumes pour vous proposer{" "}
                    <strong>le meilleur du goût en circuit-court !</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="good-choice">
            <img src={marmite} alt="marmite" className="marmite" />
            <div>
              <p>Cuisson au chaudron en cuivre</p>
              <br />
              <div
                className="read-more-btn"
                onClick={() =>
                  setShowAdditionalTextMarmite(!showAdditionalTextMarmite)
                }
              >
                <p>{showAdditionalTextMarmite ? "lire moins" : "lire plus"}</p>
                <i
                  className={
                    showAdditionalTextMarmite
                      ? "fa-solid fa-circle-arrow-up"
                      : "fa-solid fa-circle-arrow-down"
                  }
                ></i>
                <br />
                <br />
              </div>

              {showAdditionalTextMarmite && (
                <div>
                  <p className="additional-text">
                    Chez Les Confiotes de Mamie toutes nos confitures sont
                    cuites au chaudron en cuivre, comme à l’ancienne, on
                    respecte les traditions ! Et cela comporte de nombreux
                    avantages : <br />
                    <br />
                    <strong>Qualité de la cuisson :</strong> La cuisson au
                    chaudron en cuivre permet une répartition uniforme de la
                    chaleur, favorisant une cuisson homogène des fruits et une
                    préservation optimale de leurs saveurs. <br />
                    <br />
                    <strong>Texture et consistance améliorées :</strong> La
                    réaction du cuivre avec les protéines des fruits peut
                    contribuer à créer une texture plus délicate et une
                    consistance agréable, donnant aux confitures une qualité
                    artisanale.
                    <br />
                    <br /> <strong>Goût amélioré :</strong> La réactivité du
                    cuivre avec les ingrédients peut influencer positivement le
                    goût des confitures, créant des nuances de goûts qui ne
                    seraient pas obtenus avec d'autres méthodes de cuisson.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="item-list-nav">
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <input
                type="radio"
                id={category}
                checked={category === selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.id)}
              />
              <label
                htmlFor={category}
                onClick={() => dispatch(clearSearchTerm())}
                className={category === selectedCategory ? "selected" : ""}
              >
                {category}
              </label>
            </li>
          ))}
        </ul>
        <div className="search-input">
          <input
            type="text"
            placeholder="Rechercher"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => navigate("/products")}
          ></i>
        </div>
      </div>
      <div className="item-list-container">
        <div className="item-list">
          {currentPosts.length > 0 ? (
            currentPosts.map((item) => (
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
            ))
          ) : (
            <div className="empty-msg">
              Aucun produit ne correspond à la recherche.
            </div>
          )}
        </div>
      </div>
      <Pagination
        totalPosts={currentItems.length}
        postsPerPage={postsPerPage}
        setCurrentPage={(page) => {
          scrollToTop();
          setCurrentPage(page);
        }}
        currentPage={currentPage}
      />
      <CartMenu />
      {menuOpen ? <ToggleMenu menuOpen={menuOpen} /> : ""}
      <FixedCart />
      <Footer />
    </div>
  );
};

export default Products;
