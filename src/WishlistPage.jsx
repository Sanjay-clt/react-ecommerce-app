import React from "react";
import "./WishlistPage.css";

function WishlistPage({ wishlist, setWishlist, setNotifications }) {

  const removeItem = (index) => {
    const updated = wishlist.filter((_, i) => i !== index);
    setWishlist(updated);

    setNotifications(prev => [
      ...prev,
      { message: "Item removed from wishlist" }
    ]);
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>

      {wishlist.map((item, index) => (
        <div className="wishlist-card" key={index}>
          <div>
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
          </div>

          <button onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default WishlistPage;
