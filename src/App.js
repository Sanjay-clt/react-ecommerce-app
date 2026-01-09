import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import WishlistPage from "./WishlistPage";
import OrderPage from "./OrderPage";
import NotificationPage from "./NotificationPage";
import "./Notification.css";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  return (
    <>
      {/* 🔔 GLOBAL NOTIFICATION ICON */}
      <div
        className="notification-bar"
        onClick={() => navigate("/notifications")}
      >
        <span className="bell">🔔</span>
        <span className="count">{notifications.length}</span>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <ProductPage
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
              setNotifications={setNotifications}
            />
          }
        />

        <Route
          path="/cart"
          element={<CartPage setNotifications={setNotifications} />}
        />

        <Route
          path="/wishlist"
          element={
            <WishlistPage
              wishlist={wishlist}
              setWishlist={setWishlist}
              setNotifications={setNotifications}
            />
          }
        />

        <Route
          path="/order"
          element={<OrderPage setNotifications={setNotifications} />}
        />

        {/* 🔔 NOTIFICATION PAGE ROUTE */}
        <Route
          path="/notifications"
          element={<NotificationPage notifications={notifications} />}
        />
      </Routes>
    </>
  );
}

export default App;
