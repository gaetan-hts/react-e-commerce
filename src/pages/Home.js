import React from "react";
import Navbar from "../components/Navbar";
import CartMenu from "../components/CartMenu";
import Footer from "../components/Footer";
import logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import FixedCart from "../components/FixedCart";
import ToggleMenu from "../components/ToggleMenu";
import { useSelector } from "react-redux";
import camion from "../assets/img/camion.png";
import cadenas from "../assets/img/cadenas.png";
import question from "../assets/img/question.png";
import boutique from "../assets/img/boutique.png";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Home = () => {
  const navigate = useNavigate();
  const menuOpen = useSelector((state) => state.menu.isOpen);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="header-container">
        <img src={logo} alt="logo" className="logo" />
        <h2>
          Des créations gourmandes,
          <br /> un plaisir quotidien...
        </h2>
        <button
          onClick={() => {
            scrollToTop();
            navigate("/products");
          }}
        >
          Voir nos produits
        </button>
      </div>
      <section className="section1">
        <div className="intro-text">
          <h2>Découvrez</h2>
          <h3>NOTRE HISTOIRE</h3>
          <p>
            Après 20 ans de bons et loyaux services, "Mamie", a décidé de
            prendre sa retraite à l'âge de 74ans. Elle laisse derrière elle un
            héritage gourmand, confiant à Vincent les secrets de ses recettes
            anciennes. Vincent, originaire du monde agricole, passionné et
            connaisseur des bons produits de nos régions, vous fait partager son
            savoir-faire, perpétuant les traditions avec des confitures et
            autres délices issus en majorité de fruits des producteurs locaux en
            sélectionnant les meilleurs fruits de saison.
          </p>
        </div>
        <div className="intro-pic">
          <h3>Suivez-nous :</h3>
          <ul>
            <a
              href="https://www.facebook.com/LesConfiotesdeMamie?locale=fr_FR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>
                <i className="fab fa-facebook-f"></i>
              </li>
            </a>
            <a
              href="https://www.instagram.com/les_confiotesdemamie/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>
                <i className="fab fa-instagram"></i>
              </li>
            </a>
          </ul>
        </div>
      </section>
      <section className="section2">
        <div className="intro-pic">
          {" "}
          <button
            onClick={() => {
              scrollToTop();
              navigate("/products");
            }}
          >
            Voir nos produits
          </button>
        </div>
        <div className="intro-text">
          <h2>Déguster</h2>
          <h3>NOS PREPARATIONS</h3>
          <p>
            Avec une cuisson en chaudron de cuivre afin de garantir un goût
            d'exception, Vincent a su amener sa touche personnelle en apportant
            des créations originales et de nouveaux parfums en utilisant les
            produits de sa région : La Provence Garanti à 70% de fruits, Les
            Confiotes de Mamie vous feront re découvrir les saveurs des bons
            produits d'antan. Le secret, de bons fruits, du sucre, du
            savoir-faire, de la passion ! Sans additifs, sans arômes artificiels
            ni conservateur ! Que du "NA-TU-REL!" Vienne se rajouter les sirops
            avec de multiples parfums, à boire avec de l'eau plate, gazeuse, ou
            autre breuvage... Vous trouverez également les recettes uniques de
            produits salés, tapas destiné à la tartinade, à base de légumes de
            régions aux saveurs colorées, d'olive, tomate, poivrons ect...
            Vincent en a fait du chemin depuis 4ans, il a eu le privilège de
            participer au <strong>CHAMPIONNAT DU MONDE DE CONFITURE</strong> (
            <a
              href="/chemin/vers/conditions-generales-de-vente.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              voir article
            </a>
            )
          </p>
        </div>
      </section>
      <section className="section3">
        <div className="intro-text">
          <h2>Pour les Professionnels</h2>
          <h3>EVENEMENTS</h3>
          <p>
            <strong>Devenez Revendeur :</strong> Vous aimez nos produits ?
            Contactez-nous pour devenir revendeur ! Nous collaborons avec des
            épiceries, des marchands, des fromagers, des restaurateurs et des
            campings, tant en France qu'à l'étranger.
            <br />
            <br />
            <strong>Transformation de Production :</strong> Si vous êtes
            producteur, transformez votre récolte chez nous ! De fruits en
            confitures, sirops et vinaigres, à légumes en tartinables,
            condiments et soupes, offrez à vos clients une variété de créations.
            Personnalisez également votre propre étiquette au nom de votre
            enseigne en véhiculant vos valeurs !
            <br />
            <br />
            <strong>Offres aux Comités d'Entreprise :</strong> Pour les comités
            d'entreprise, proposez nos produits à tarif préférentiel tout au
            long de l'année. Nous pouvons également organiser des événements
            spéciaux pour les marchés CE.
            <br />
            <br />
            <strong>Cadeaux Personnalisés :</strong> Pour des événements
            spéciaux tels que mariages ou baptêmes, nous créons des parfums sur
            mesure. Vous pouvez même apposer votre propre marque sur nos
            produits ou créer des étiquettes personnalisées de A à Z (photo,
            texte, illustration...).
          </p>
        </div>
        <div className="intro-pic">
          <div className="contact-us">
            <h3>Contactez-nous !</h3>
            <CopyToClipboard
              text="lesconfiotesdemamie@gmail.com"
              className="hover"
            >
              <p
                style={{ cursor: "pointer" }}
                className="clipboard"
                onClick={() => alert("Email copié !")}
              >
                lesconfiotesdemamie@gmail.com
              </p>
            </CopyToClipboard>
            <CopyToClipboard text="06 46 41 31 59" className="hover">
              <p
                style={{ cursor: "pointer" }}
                className="clipboard"
                onClick={() => alert("Téléphone copié !")}
              >
                06 46 41 31 59
              </p>
            </CopyToClipboard>
          </div>
        </div>
      </section>
      <section className="section4">
        <div className="info-card">
          <img src={camion} alt="camion" className="camion" />
          <h5>Livraison gratuite (65€)</h5>
          <p>
            Livraison offerte à domicile ou en points relais pour les achats de
            plus de 65€
          </p>
        </div>
        <div className="info-card">
          <img src={boutique} alt="boutique" className="boutique" />
          <h5>Click and collect !</h5>
          <p>Venez récupérer votre commande directement en magasin !</p>
        </div>
        <div className="info-card">
          <img src={cadenas} alt="cadenas" className="cadenas" />
          <h5>Paiement Sécurisé</h5>
          <p>
            Paiement sécurisé par carte bancaire, Google pay ou Link avec le
            service de paiment Stripe.
          </p>
        </div>
        <div className="info-card">
          <img src={question} alt="question" className="question" />
          <h5>Support en ligne</h5>
          <p>
            Une question ? Un problème ? N'hésitez pas à nous contacter par
            téléphone ou par email (dans le pied de page).
          </p>
        </div>
      </section>
      <CartMenu />
      {menuOpen ? <ToggleMenu menuOpen={menuOpen} /> : ""}
      <FixedCart />
      <Footer />
    </div>
  );
};

export default Home;
