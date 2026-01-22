import CustomButton from "../CustomButton";
import { Link } from "react-router-dom";

const WomenSectionProductItems = (props) => {
  const { productDetails } = props;
  const { productId, productImage, productName, productPrice } = productDetails;
  return (
    <Link to={`/product/${productId}`} className="w-full list-none no-underline">
      <li className="flex flex-col m-[20px] items-start justify-start w-[300px] transition transform hover:scale-105 duration-300 shadow-lg rounded-xl">
        <img
          src={productImage}
          alt={productName}
          className="w-[100%] h-[300px] rounded-tl-xl rounded-tr-xl"
        />
        <div className="m-3">
          <h4 className="text-[#000000] font-bold text-[17px]">
            {productName}
          </h4>
          <h5 className="text-[gray] font-semibold text-[13px]">
            {productPrice}/-
          </h5>
        </div>

        <CustomButton
          sx={{
            width: "100%",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
            borderTopRightRadius: "0",
            borderTopLeftRadius: "0",
          }}
        >
          View Details
        </CustomButton>
      </li>
    </Link>
  );
};

export default WomenSectionProductItems;
