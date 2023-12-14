import "./assets/styles/index.scss";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import ItemDetails from "./pages/ItemDetails";
import Checkout from "./pages/Checkout";
// import Auth from "./pages/Auth";
// import User from "./pages/User";
// import ResetPassword from "./pages/ResetPassword";
// import ForgottenPassword from "./pages/ForgottenPassword";
import Success from "./pages/Success";
import Failed from "./pages/Failed";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          {/* <Route path="auth" element={<Auth />} /> */}
          {/* <Route path="user" element={<User />} /> */}
          <Route path="products" element={<Products />} />
          {/* <Route path="reset-password" element={<ResetPassword />} /> */}
          {/* <Route path="forgot-password" element={<ForgottenPassword />} /> */}
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Success />} />
          <Route path="checkout/failed" element={<Failed />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
