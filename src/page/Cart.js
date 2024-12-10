import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Make sure you import axios

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Calculating total price and total quantity
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  // Place order function
  const placeOrder = async () => {
    // Check if user is logged in
    if (!user || !user._id) {
      toast.error("Please log in to place an order");
      navigate("/login");
      return;
    }

    // Create order payload
    const orderData = {
      userId: user.email, // Use user ID from redux state
      items: productCartItem, // Use cart items from redux state
      totalPrice: totalPrice, // Use total price calculated earlier
    };
    console.log(orderData);
    try {
      // Sending request to backend to place the order
      const response = await axios.post("http://localhost:8080/api/orders", orderData);

      // Handle success response
      if (response.data) {
        toast.success("Order placed successfully!");
        // Optionally, navigate to a different page after placing the order (e.g., order confirmation page)
        navigate("/success");
      }
    } catch (error) {
      // Handle error response
      console.error("Error placing order:", error.message);
      toast.error(error.response?.data?.message || "Error placing order");
    }
  };

  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">Your Cart Items</h2>

        {productCartItem.length > 0 ? (
          <div className="my-4 flex gap-3">
            {/* display cart items */}
            <div className="w-full max-w-3xl">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                );
              })}
            </div>

            {/* total cart item */}
            <div className="w-full max-w-md ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">₹</span> {totalPrice}
                </p>
              </div>
              <button
                className="bg-red-500 w-full text-lg font-bold py-2 text-white"
                onClick={placeOrder}  // Call placeOrder directly
              >
                Place Order
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img src={emptyCartImage} className="w-full max-w-sm" />
              <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
