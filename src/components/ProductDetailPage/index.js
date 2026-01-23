import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import ProductDetailedPageItem from "../ProductDetailedPageItem";

import "./index.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [getProductData, setGetProductData] = useState([]);
  const jwtToken = Cookies.get("jwt_token");

  const getSingleProductData = useCallback(async () => {
    const url = `https://clothing-ecommerce-backend-f011.onrender.com/product?product_id=${id}`;

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
      setGetProductData(updatedData);
    }
  }, [id, jwtToken]);

  useEffect(() => {
    getSingleProductData();
  }, [getSingleProductData]);

  return (
    <div className="product-detail-page-container">
      <h1 className="text-[30px] font-bold text-[#000000] mt-8 mb-8">
        Product Details
      </h1>
      {getProductData.map((product) => (
        <ProductDetailedPageItem
          key={product.productId}
          productDetails={product}
        />
      ))}
    </div>
  ); 
};

export default ProductDetailPage;
