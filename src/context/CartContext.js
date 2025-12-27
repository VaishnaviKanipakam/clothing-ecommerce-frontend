import { createContext } from "react";

const CartContext = createContext({
  cartCount: 0,
  setCartCount: () => {},
  getCartItemsCount: () => {},
});

export default CartContext;
