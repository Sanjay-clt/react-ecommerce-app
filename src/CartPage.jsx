import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

function CartPage({ setNotifications }) {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      <h2>My Cart</h2>

      {cartItems.map((item, index) => (
        <div className="cart-card" key={index}>
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>

          <button onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}

      <h3>Grand Total: ₹{total}</h3>

      <button
        className="order-btn"
        onClick={() => {
          setNotifications(prev => [
            ...prev,
            { message: "Order initiated from cart" }
          ]);

          navigate("/order", { state: { cartItems } });
        }}
      >
        Place Order
      </button>
    </div>
  );
}

export default CartPage;
