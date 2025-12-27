import DashboardHeader from "./DashboardHeader";
import { useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import Cookies from "js-cookie";
import Footer from "./Footer";

const DashboardLayout = ({ children }) => {
  const [cartCount, setCartCount] = useState(0); 
  const jwtToken = Cookies.get("jwt_token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.result?.[0]?.user_id;

  const getCartItemsCount = async () => {
    const url = `https://clothing-ecommerce-backend-f011.onrender.com/cart_items_count?user_id=${userId}`;

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const cartItemsCountResponse = await fetch(url, options);
    if (cartItemsCountResponse.ok === true) {
      const cartItemsCountData = await cartItemsCountResponse.json();
      setCartCount(cartItemsCountData[0]?.cart_items_count || 0);
    }
  };

  useEffect(() => {
    getCartItemsCount();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartCount, setCartCount, getCartItemsCount }}
    >
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </CartContext.Provider>
  );
};

export default DashboardLayout;
