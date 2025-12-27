import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import WomenSectionProductItems from "../WomenSectionProductItems";
import CustomInput from "../CustomInput";
import SearchIcon from "@mui/icons-material/Search";

import "./index.css";

const WomenSection = () => {
  const [getProductsList, setGetProductsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const jwtToken = Cookies.get("jwt_token");

  const getAllProducts = async () => {
    const url = `http://localhost:5000/products?product_category=Women`;

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
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
    <div className="women-section-container">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-black font-bold text-[30px] mt-5">Women Section</h1>
        <div>{renderSearchInputField()}</div>
      </div>

      <ul className="list-none grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-[50px]">
        {filteredResult.map((eachProduct) => (
          <WomenSectionProductItems
            key={eachProduct.productId}
            productDetails={eachProduct}
          />
        ))}
      </ul>
    </div>
  );
};

export default WomenSection;
