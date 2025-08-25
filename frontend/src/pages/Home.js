import React, { useState } from 'react';
import BannerCarousel from '../components/BannerCarousel';
import './Home.css';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Grocery', img: '/images/products/grocery.png' },
  { name: 'Mobiles', img: '/images/products/mobiles.png' },
  { name: 'Fashion', img: '/images/products/fashion.png' },
  { name: 'Electronics', img: '/images/products/electronics.png' },
  { name: 'Cosmetics', img: '/images/products/beauty.png' },
  { name: 'Food & Snacks', img: '/images/products/food.png' },
  { name: 'Toys', img: '/images/products/toy.png' },
];

const Home = ({ products = [], addToCart }) => {
  const [addedProductId, setAddedProductId] = useState(null); // ✅ Correct location

  const handleAdd = (product) => {
    addToCart(product);
    setAddedProductId(product._id);
    setTimeout(() => setAddedProductId(null), 500); // ✅ Reset after 0.5s
  };

  return (
    <div className="container">
      {/* Category Icons */}
      <div className="category-row">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="category"
            onClick={() => {
              const el = document.getElementById(cat.name.toLowerCase().replace(' ', '-'));
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <img src={cat.img} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Carousel */}
      <BannerCarousel />

      {/* Category-wise Product Sections */}
      {categories.map((cat) => (
        <div key={cat.name} id={cat.name.toLowerCase().replace(' ', '-')}>
          <h2>🛒 {cat.name}</h2>
          <div className="horizontal-scroll">
            {products
              .filter((p) => p.category === cat.name)
              .map((product) => (
                <div key={product._id} className="product-item">
                  <Link to={`/product/${product._id}`} className="card">
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>₹{product.price}</p>
                  </Link>
                  <button
                    onClick={() => handleAdd(product)}
                    className="btn"
                  >
                    {addedProductId === product._id ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
