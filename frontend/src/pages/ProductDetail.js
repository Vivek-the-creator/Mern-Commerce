import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((products) => {
        const match = products.find((p) => p._id === id);
        setProduct(match);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 500); // ✅ Show "Added" for 0.5s
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{product.name}</h2>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p>{product.description}</p>

      {/* Image Gallery */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {product.images?.map((img, i) => (
          <img key={i} src={img} alt={`Product ${i}`} width="200" />
        ))}
      </div>

      {/* Add to Cart Button */}
      <button onClick={handleAddToCart} className="btn">
        {added ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductDetail;
