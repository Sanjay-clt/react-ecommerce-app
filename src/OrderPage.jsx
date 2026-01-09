import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderPage.css";

function OrderPage({ setNotifications }) {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;
  const cartItems = location.state?.cartItems || [];

  const initialItems = product
    ? [{ ...product, quantity: 1 }]
    : cartItems.map(item => ({ ...item, quantity: 1 }));

  // ✅ FIX: remove unused setter
  const [orderItems] = useState(initialItems);

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="order-container">
      <h2>Order Summary</h2>

      {orderItems.map((item, index) => (
        <div key={index}>
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>
        </div>
      ))}

      <h3>Grand Total: ₹{total}</h3>

      <button
        onClick={() => {
          setNotifications(prev => [
            ...prev,
            { message: "Order placed successfully" }
          ]);
          alert("Order placed successfully 🎉");
          navigate("/");
        }}
      >
        Confirm Order
      </button>
    </div>
  );
}

export default OrderPage;
