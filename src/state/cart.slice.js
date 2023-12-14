import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
  shippingMethod: null,
  finalPrice: null,
  currentStep: 1,
};

// Récupérer le panier depuis le localStorage
const storedCart = localStorage.getItem("cart");
const parsedCart = storedCart ? JSON.parse(storedCart) : [];

// Récupérer le finalPrice depuis le localStorage
const storedFinalPrice = localStorage.getItem("finalPrice");
const parsedFinalPrice = storedFinalPrice ? parseFloat(storedFinalPrice) : null;

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    ...initialState,
    cart: parsedCart,
    finalPrice: parsedFinalPrice,
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      const { item, count } = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        existingItem.count += count;
      } else {
        state.cart.push({
          ...item,
          count: count,
        });
      }
      // Enregistrer le panier dans le localStorage après chaque modification
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      // Enregistrer le panier dans le localStorage après chaque modification
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    increaseCount: (state, action) => {
      const { id } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.count++;
        // Enregistrer le panier dans le localStorage après chaque modification
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decreaseCount: (state, action) => {
      const { id } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item && item.count > 1) {
        item.count--;
        // Enregistrer le panier dans le localStorage après chaque modification
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    setShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
      localStorage.setItem("shippingMethod", action.payload);
    },

    setFinalPrice: (state, action) => {
      state.finalPrice = action.payload;
      localStorage.setItem("finalPrice", action.payload.toString()); // Store the finalPrice in local storage as a string
    },

    clearCart: (state) => {
      state.cart = [];
      state.finalPrice = null;
      localStorage.removeItem("cart"); // Supprime le panier du local storage
      localStorage.removeItem("finalPrice"); // Supprime le finalPrice du local storage
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  setShippingMethod,
  setFinalPrice,
  clearCart,
  setCurrentStep,
} = cartSlice.actions;

export default cartSlice.reducer;
