import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductPage.css";

function ProductPage({ cart, setCart, wishlist, setWishlist, setNotifications }) {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Product 1", price: 999 },
    { id: 2, name: "Product 2", price: 1499 },
    { id: 3, name: "Product 3", price: 1999 },
    { id: 4, name: "Product 4", price: 899 },
    { id: 5, name: "Product 5", price: 1299 },
    { id: 6, name: "Product 6", price: 1599 },
  ];

  const addToCart = (product) => {
    let updatedCart;
    const exists = cart.find(item => item.id === product.id);

    if (exists) {
      updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setNotifications(prev => [
      ...prev,
      { message: `${product.name} added to cart` }
    ]);
  };

  const addToWishlist = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    if (exists) return;

    setWishlist([...wishlist, product]);

    setNotifications(prev => [
      ...prev,
      { message: `${product.name} added to wishlist` }
    ]);
  };

  const buyNow = (product) => {
    navigate("/order", {
      state: { product }
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Online Shopping Website</h2>

        <div className="top-buttons">
          <button onClick={() => navigate("/cart")}>
            🛒 Cart ({cart.length})
          </button>

          <button onClick={() => navigate("/wishlist")}>
            ❤️ Wishlist ({wishlist.length})
          </button>
        </div>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <div className="card" key={product.id}>
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            <div className="icons">
              <button onClick={() => addToCart(product)}>🛒</button>
              <button onClick={() => addToWishlist(product)}>❤️</button>
            </div>

            <button className="buy-btn" onClick={() => buyNow(product)}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
