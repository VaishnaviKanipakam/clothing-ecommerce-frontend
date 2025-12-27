import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CartItem from "../CartItem";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AddCallIcon from "@mui/icons-material/AddCall";
import HomeIcon from "@mui/icons-material/Home";

import "./index.css";

const Cart = () => {
  const [getCartItemsList, setGetCartItemsList] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.result?.[0]?.user_id;
  const jwtToken = Cookies.get("jwt_token");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getcartItems = async () => {
    const url = `http://localhost:5000/cart_items?user_id=${userId}`;

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      const data = await response.json();
      const updatedData = data.map((eachItem) => ({
        userId: eachItem.user_id,
        cartId: eachItem.cart_id,
        productImage: eachItem.product_image,
        productName: eachItem.product_name,
        productPrice: eachItem.product_price,
        productSize: eachItem.product_size,
        productQuantity: eachItem.product_quantity,
        productId: eachItem.product_id,
        productCategory: eachItem.product_category,
      }));
      setGetCartItemsList(updatedData);
    }
  };

  const cartTotalPrice = getCartItemsList.reduce(
    (sum, price) => sum + price.productPrice * price.productQuantity,
    0
  );

  const renderNameField = () => {
    return (
      <CustomInput
        label="Name"
        type="text"
        required
        value={name}
        placeholder="John Doe"
        onChange={(e) => setName(e.target.value)}
        icon={<PermIdentityOutlinedIcon sx={{ fontSize: "20px" }} />}
      />
    );
  };

  const renderPhoneNumberField = () => {
    return (
      <CustomInput
        label="Phone NUmber"
        type="number"
        required
        value={phoneNumber}
        placeholder="0000000000"
        onChange={(e) => setPhoneNumber(e.target.value)}
        icon={<AddCallIcon sx={{ fontSize: "20px" }} />}
      />
    );
  };

  const renderAddressField = () => {
    return (
      <CustomInput
        label="Address"
        type="text"
        required
        value={address}
        placeholder="Enter your address"
        onChange={(e) => setAddress(e.target.value)}
        icon={<HomeIcon sx={{ fontSize: "20px" }} />}
      />
    );
  };

  const onSubmitOrderDetailsForm = async (event) => {
    event.preventDefault();
    const orderDetails = {
      cartItems: getCartItemsList,
      totalPrice: cartTotalPrice,
      name,
      phoneNumber,
      address,
    };
    const url = `http://localhost:5000/order?user_id=${userId}`;

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(orderDetails),
    };

    const postOrderDetailsResponse = await fetch(url, options);
    if (postOrderDetailsResponse.ok === true) {
      const successData = await postOrderDetailsResponse.json();
      setSuccessMessage(successData);
      setMessage(true);
      setName("");
      setAddress("");
      setPhoneNumber("");
    } else if (postOrderDetailsResponse.ok === false) {
      const errorData = postOrderDetailsResponse.json();
      setErrorMessage(errorData);
      setMessage(false);
    }
  };

  useEffect(() => {
    getcartItems();
  }, []);

  return getCartItemsList.length === 0 ? (
    <div className="cart-container">
      <h1 className="text-[30px] font-bold text-[#000000] mt-8 mb-8">
        No Productd Found
      </h1>
      <Link to="/dashboard">
        <CustomButton>Continue to Shop</CustomButton>
      </Link>
    </div>
  ) : (
    <div className="cart-container">
      <h1 className="text-[30px] font-bold text-[#000000] mt-8 mb-8">Cart</h1>
      <ul className="list-none w-[80%] flex flex-col items-center justify-center">
        {getCartItemsList.map((eachItem) => (
          <CartItem
            key={eachItem.cartId}
            cartItemDetails={eachItem}
            getcartItems={getcartItems}
          />
        ))}
      </ul>
      <h3 className="text-[25px] font-bold text-black mt-8 mb-8 self-end">
        Total Price: {cartTotalPrice}/-
      </h3>
      <CustomButton sx={{ alignSelf: "flex-end" }} onClick={handleClickOpen}>
        Proceed to Checkout
      </CustomButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          <form
            onSubmit={onSubmitOrderDetailsForm}
            id="subscription-form"
            className="w-[400px] flex flex-col items-center jus\"
          >
            <div>{renderNameField()}</div>
            <div>{renderPhoneNumberField()}</div>
            <div>{renderAddressField()}</div>
            <div className="self-end mt-8 mb-8">
              <h1 className="text-[20px] font-bold text-black">
                Total: {cartTotalPrice}/-
              </h1>
            </div>
            <div className="box-border text-center w-full">
              <p
                className={`text-base mt-2 font-bold ${
                  message ? "text-green-500" : "text-red-500"
                }`}
              >
                {message ? successMessage : errorMessage}
              </p>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleClose}>Cancel</CustomButton>
          <CustomButton type="submit" form="subscription-form">
            Place Order
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;
