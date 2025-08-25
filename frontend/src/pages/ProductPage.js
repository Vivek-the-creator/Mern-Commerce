// src/pages/ProductPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setSelectedImage(data.images?.[0] || data.image);
      });
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail">
  <div className="images-section">
    {product.images.map((img, index) => (
      <img key={index} src={img} alt={`product-${index}`} />
    ))}
  </div>
  <div className="info-section">
    <h1>{product.name}</h1>
    {product.description.split('\n').map((line, idx) => (
        <p key={idx}>{line}</p>
    ))}

    <h2>₹{product.price}</h2>
    <button onClick={() => addToCart(product)}>Add to Cart</button>
    <button className="buy-now">Buy Now</button>
  </div>
</div>


  );
};

export default ProductPage;
