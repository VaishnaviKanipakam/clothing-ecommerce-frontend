import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect, useCallback } from "react";

import "./index.css";

const MyProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.result?.[0]?.name || "U";
  const userId = user?.result?.[0]?.user_id;
  const jwtToken = Cookies.get("jwt_token");
  const [allOrdersList, setAllOrdersList] = useState([]);

  const getOrdersList = useCallback(async () => {
    const url = `https://clothing-ecommerce-backend-f011.onrender.com/get_orders?user_id=${userId}`;

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const getOrdersListResponse = await fetch(url, options);
    if (getOrdersListResponse.ok === true) {
      const getOrdersListData = await getOrdersListResponse.json();
      const updatedData = getOrdersListData.map((eachOrder) => ({
        orderId: eachOrder.order_id,
        orderStaus: eachOrder.order_status,
        orderDate: eachOrder.order_date,
        itemImage: eachOrder?.cart_items_json,
        orderPrice: eachOrder.total_price,
      }));
      setAllOrdersList(updatedData);
    }
  }, [userId, jwtToken]);

  const dateTime = (orderDate) => {
    return new Date(orderDate).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    getOrdersList();
  }, [getOrdersList]);

  return (
    <div className="my-profile-page-container">
      <div className="flex flex-row items-center justify-start box-border">
        <Avatar
          sx={{
            backgroundColor: "#000000",
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: "bold",
            width: "48px",
            height: "48px",
          }}
        >
          {name[0].toUpperCase()}
        </Avatar>
        <div className="flex flex-col">
          <h1 className="text-[25px] font-semibold ml-3 text-[#000000]">
            {name.toUpperCase()}
          </h1>
          <h6 className="text-[15px] font-semibold ml-3 text-[#494949]">
            {user?.result?.[0]?.email}
          </h6>
        </div>
      </div>
      <h1 className="text-[27px] font-bold text-[#000000] mt-8 mb-8 ">
        Your Orders
      </h1>
      <ul className="flex flex-col w-[60%] box-border">
        {allOrdersList.map((eachOrder) => (
          <li
            className="w-full items-start justify-start self-start shadow-lg p-4 box-border rounded-xl mb-5"
            key={eachOrder.orderId}
          >
            <div className="flex flex-row items-center justify-between w-full">
              <h6 className="text-[18px] text-[#000000] font-bold">
                {eachOrder.orderStaus}✅
              </h6>
              <h6 className="text-[16px] text-[#000000] font-bold">
                {eachOrder.orderPrice}/-
              </h6>
            </div>
            <p className="text-[#616161] font-semibold text-[14px]">{`Placed at ${dateTime(
              eachOrder.orderDate
            )}`}</p>
            <div className="flex flex-row">
              {eachOrder?.itemImage.map((image) => (
                <img
                  key={image.cartId}
                  src={image.productImage}
                  alt="productImage"
                  className="w-[50px] h-[50px] rounded-lg mr-3"
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProfilePage;
