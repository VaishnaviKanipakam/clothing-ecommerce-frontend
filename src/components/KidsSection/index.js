import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import KidsSectionProductItems from "../KidsSectionProductItems";
import CustomInput from "../CustomInput";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";

import "./index.css";

const KidsSection = () => {
  const [getProductsList, setGetProductsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const jwtToken = Cookies.get("jwt_token");

  const getAllProducts = useCallback(async () => {
    const url = `https://clothing-ecommerce-backend-f011.onrender.com/products?product_category=Kids`;

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
      const updatedData = data.map((eachProduct) => ({
        productId: eachProduct.product_id,
        productCategory: eachProduct.product_category,
        productDescription: eachProduct.product_description,
        productImage: eachProduct.product_image,
        productName: eachProduct.product_name,
        productPrice: eachProduct.product_price,
        productSize: eachProduct.product_size,
        productStock: eachProduct.product_stock,
      }));
      setGetProductsList(updatedData);
    }
  }, [jwtToken]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  
  const loader = () => {
    return (
      <div>
        <CircularProgress color="black" />
      </div>
    );
  };
  
  const filteredResult = getProductsList.filter((eachProduct) =>
    eachProduct.productName
      .toLowerCase()
      .includes(searchInput.toLocaleLowerCase())
  );

  const renderSearchInputField = () => {
    return (
      <CustomInput
        type="search"
        value={searchInput}
        placeholder="Product Name"
        onChange={(e) => setSearchInput(e.target.value)}
        icon={<SearchIcon sx={{ fontSize: "20px" }} />}
      />
    );
  };

  return (
    <div className="kids-section-container">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-black font-bold text-[30px] mt-5">Kids Section</h1>
        <div>{renderSearchInputField()}</div>
      </div>

      {getProductsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full w-full mt-[50px]">
          {loader()}
        </div>
      ) : (
        <ul className="list-none grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-[50px]">
          {filteredResult.map((eachProduct) => (
            <KidsSectionProductItems
              key={eachProduct.productId}
              productDetails={eachProduct}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default KidsSection;
