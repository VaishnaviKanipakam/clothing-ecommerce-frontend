import CustomButton from "../CustomButton";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import CartContext from "../../context/CartContext";

const ProductDetailedPageItem = (props) => {
  const { productDetails } = props;
  const [selectedProductSize, setSelectedProductSize] = useState(null);
  const jwtToken = Cookies.get("jwt_token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.result?.[0]?.user_id;
  const { getCartItemsCount } = useContext(CartContext);

  const {
    productId,
    productCategory,
    productDescription,
    productImage,
    productName,
    productPrice,
    productSize,
    productStock,
  } = productDetails;

  const sizes = productSize.split(",");

  const onAddProductToCart = async () => {
    const url = `https://clothing-ecommerce-backend-f011.onrender.com/cart`;
    const productInformation = {
      userId,
      productId,
      productCategory,
      productImage,
      productName,
      productPrice,
      selectedProductSize,
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(productInformation),
    };
    const response = await fetch(url, options);
    if (response.ok === true) {
      getCartItemsCount();
    }
  };

  return (
    <div className="flex flex-row items-start justify-start h-[550px]  pr-9 transition transform hover:scale-105 duration-300 shadow-lg rounded-xl">
      <img
        src={productImage}
        alt={productName}
        className="h-[100%] w-[300px] rounded-tl-xl rounded-bl-xl mr-6"
      />
      <div className="flex flex-col items-start justify-start  w-[200px] mt-5">
        <h3 className="text-[#000000] font-medium text-[20px]">
          {productName}
        </h3>
        <h4 className="text-[gray] font-medium text-[16px]">
          {productPrice}/-
        </h4>
        <hr className="border-dashed w-full text-[gray]" />
        <h3 className="text-[#494949] font-medium text-[16px]">
          {productDescription}
        </h3>
        <h3 className="text-[#494949] font-medium text-[16px]">
          Status: <span className="text-[#000000]">{productStock}</span>
        </h3>
        <hr className="border-dashed w-full text-[gray]" />
        <h3 className="text-[#494949] font-medium text-[16px]">Sizes</h3>
        <div className="flex flex-row items-center bg-none box-border">
          {sizes.map((size) => (
            <CustomButton
              variant="text"
              onClick={() => setSelectedProductSize(size)}
              sx={{
                margin: "0px 0px 0px 0px",
                width: "30px",
                backgroundColor:
                  selectedProductSize === size ? "#000000" : "transparent",
                color: selectedProductSize === size ? "#ffffff" : "#000000",
                borderRadius: "50%",
                padding: "0px 0px 0px 0px",
                minWidth: "unset",
                boxShadow: "none",
              }}
              key={size}
            >
              {size}
            </CustomButton>
          ))}
        </div>

        <CustomButton onClick={onAddProductToCart} sx={{ marginTop: "30px" }}>
          Add To Cart
        </CustomButton>
      </div>
    </div>
  );
};

export default ProductDetailedPageItem;
