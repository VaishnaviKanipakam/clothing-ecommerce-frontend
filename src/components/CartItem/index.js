import CustomButton from "../CustomButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState, useEffect, useContext, useCallback} from "react";
import CartContext from "../../context/CartContext";
import Cookies from "js-cookie";

const CartItem = (props) => {
  const { cartItemDetails, getcartItems } = props;
  const {
    userId,
    cartId,
    productImage,
    productName,
    productPrice,
    productSize,
    productQuantity,
    productId,
    productCategory,
  } = cartItemDetails;
  const jwtToken = Cookies.get("jwt_token");
  const [productQuantityCount, setProductQuantityCount] =
    useState(productQuantity);
  const { getCartItemsCount } = useContext(CartContext);

  const updateCartItem = useCallback(async () => {
    const cartUpdateDetails = { productQuantityCount };
    const url = `https://clothing-ecommerce-backend-f011.onrender.com/update_cart_item?user_id=${userId}&cart_id=${cartId}&product_id=${productId}&product_category=${productCategory}`;

    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(cartUpdateDetails),
    };
    const updateCartItemResponse = await fetch(url, options);
    if (updateCartItemResponse.ok === true) {
      getcartItems();
    }
  }, [productQuantityCount, userId, cartId, productId, productCategory, jwtToken, getcartItems]);

  const deleteCartItem = useCallback(async () => {
    const url = `https://clothing-ecommerce-backend-f011.onrender.com/delete_cart_item?user_id=${userId}&cart_id=${cartId}&product_id=${productId}&product_category=${productCategory}`;

    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const deleteCartItemResponse = await fetch(url, options);
    if (deleteCartItemResponse.ok === true) {
      getcartItems();
      getCartItemsCount();
    }
  }, [userId, cartId, productId, productCategory, jwtToken, getcartItems, getCartItemsCount]);

  const totalPrice = Number(productPrice) * productQuantityCount;

  useEffect(() => {
    if (Number(productQuantityCount) === 0) {
      deleteCartItem();
    } else {
      updateCartItem();
    }
  }, [productQuantityCount, deleteCartItem, updateCartItem]);

  return (
    <li className="flex flex-row items-center justify-between shadow-lg rounded-xl w-full h-fit pt-3 pb-3 pl-5 pr-5 mb-4 box-border">
      <div className="flex flex-col justify-center items-center">
        <img
          src={productImage}
          alt={productName}
          className="rounded-xl h-[100px] w-[100px] "
        />
        <h6 className="text-[#000000] font-bold text-[16px]">{productName}</h6>
      </div>
      <h6 className="text-[#000000] font-bold text-[16px]">{productSize}</h6>
      <div className="flex flex-row items-center">
        <CustomButton
          onClick={() => setProductQuantityCount((prev) => prev - 1)}
          variant="text"
          sx={{
            backgroundColor: "none",
            color: "#000000",
            minWidth: "unset",
            boxShadow: "none",
          }}
        >
          <RemoveIcon />
        </CustomButton>
        <h6 className="text-[#000000] font-bold text-[16px] mr-2 ml-2">
          {productQuantityCount}
        </h6>
        <CustomButton
          onClick={() => setProductQuantityCount((prev) => prev + 1)}
          variant="text"
          sx={{
            backgroundColor: "none",
            color: "#000000",
            minWidth: "unset",
            boxShadow: "none",
          }}
        >
          <AddIcon />
        </CustomButton>
      </div>
      <h6 className="text-[#000000] font-bold text-[18px]">{totalPrice}/-</h6>
    </li>
  );
};

export default CartItem;
