import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CartItem from "../CartItem";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AddCallIcon from '@mui/icons-material/AddCall';
import HomeIcon from '@mui/icons-material/Home';



import "./index.css";

const Cart = () => {
  const [getCartItemsList, setGetCartItemsList] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
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
    console.log("24CartResponse", response);
    if (response.ok === true) {
      const data = await response.json();
      console.log("27CartData", data);
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

  
  const cartTotalPrice = getCartItemsList.reduce((sum, price) => (
    sum+ (price.productPrice) * (price.productQuantity)
  ), 0)

  const renderNameField = () => {
    return (
      <CustomInput
        label="Name"
        type="text"
        required
        value={name}
        placeholder="John Doe"
        onChange={(e) => setName(e.target.value)}
        icon={<PermIdentityOutlinedIcon sx={{ fontSize: "20px" }}/>}
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
        icon={<AddCallIcon  sx={{ fontSize: "20px" }}/>}
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
        placeholder="0000000000"
        onChange={(e) => setAddress(e.target.value)}
        icon={<HomeIcon  sx={{ fontSize: "20px" }}/>}
      />
    );
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
          <CartItem key={eachItem.cartId} cartItemDetails={eachItem} getcartItems={getcartItems}/>
        ))}
      </ul>
      <h3 className="text-[25px] font-bold text-black mt-8 mb-8 self-end">Total Price: {cartTotalPrice}/-</h3>
      <CustomButton sx={{alignSelf: "flex-end"}} onClick={handleClickOpen}>Proceed to Checkout</CustomButton>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            {/* <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            /> */}
            <div>{renderNameField()}</div>
            <div>{renderPhoneNumberField()}</div>
            <div>{renderAddressField()}</div>
            <DialogContentText>
                
                <h1 className="text-[25px] font-bold text-black mt-8 mb-8 self-end">Total: {cartTotalPrice}</h1>
            </DialogContentText>
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
