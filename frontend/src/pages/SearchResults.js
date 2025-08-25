import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const query = useQuery().get('query')?.toLowerCase();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((products) => {
        const filtered = products.filter((p) =>
          p.name.toLowerCase().includes(query)
        );
        setResults(filtered);
      });
  }, [query]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Search Results for: "{query}"</h2>
      {results.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <div className="product-grid">
          {results.map((product) => (
            <div key={product._id} className="card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <Link to={`/product/${product._id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
