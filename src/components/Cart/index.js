import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import CartItem from "../CartItem"

import "./index.css"

const Cart = () => {
const [getCartItemsList, setGetCartItemsList] = useState([])
const user = JSON.parse(localStorage.getItem("user"))
const userId = user?.result?.[0]?.user_id
const jwtToken = Cookies.get("jwt_token")

const getcartItems = async () => {
    const url = `http://localhost:5000/cart_items?user_id=${userId}`

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options);
    console.log("24CartResponse", response);
    if(response.ok ===  true){
        const data = await response.json()
        console.log("27CartData", data)
        const updatedData = data.map((eachItem) => ({
            cartId: eachItem.cart_id,
            productImage: eachItem.product_image,
            productName: eachItem.product_name,
            productPrice: eachItem.product_price,
            productSize: eachItem.product_size,
            productId: eachItem.product_id
        }))
        setGetCartItemsList(updatedData)
    }
}

useEffect(() => {
    getcartItems()
}, [])


  return (
    <div className='cart-container'>
      <h1 className="text-[30px] font-bold text-[#000000] mt-8 mb-8">Cart</h1>
        <ul className="list-none w-[80%] flex flex-col items-center justify-center">
            {getCartItemsList.map((eachItem) => (
                <CartItem key={eachItem.cartId} cartItemDetails={eachItem}/>
            ))}
        </ul>
    </div>
  )
}

export default Cart
