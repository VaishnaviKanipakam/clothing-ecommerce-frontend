import CustomButton from "../CustomButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";

const CartItem = (props) => {
  const [productQuantity, setProductQuantity] = useState(0);
  const { cartItemDetails } = props;
  const {
    cartId,
    productImage,
    productName,
    productPrice,
    productSize,
    productId,
  } = cartItemDetails;
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
        onClick={() => setProductQuantity(prev => prev-1)}
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
          {productQuantity}
        </h6>
        <CustomButton
        onClick={() => setProductQuantity(prev => prev+1)}
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
      <h6 className="text-[#000000] font-bold text-[18px]">{productPrice}/-</h6>
    </li>
  );
};

export default CartItem;
