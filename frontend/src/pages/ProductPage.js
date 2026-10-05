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
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setSelectedImage(data.images?.[0] || data.image);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setProduct(null);
      });
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail">
      <div className="images-section">
        {selectedImage && (
          <img className="main-image" src={selectedImage} alt={product.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        )}
        <div className="thumbnail-list" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          {(product.images || [product.image]).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`product-${index}`}
              onClick={() => setSelectedImage(img)}
              style={{ width: '60px', height: '60px', cursor: 'pointer', border: selectedImage === img ? '2px solid #007bff' : '1px solid #ccc' }}
            />
          ))}
        </div>
      </div>
      <div className="info-section">
        <h1>{product.name}</h1>
        {product.description?.split('\n').map((line, idx) => (
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
