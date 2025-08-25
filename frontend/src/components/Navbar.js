// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FaHome, FaShoppingCart, FaClipboardList, FaSearch } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ products }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (query.trim()) {
      const results = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  }, [query, products]);

  const handleSearchClick = (id) => {
    navigate(`/product/${id}`);
    setQuery('');
    setFiltered([]);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">🛒 MERN E-Commerce</h2>
      </div>

      <div className="navbar-center">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <div className="search-suggestions">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <div
                    key={item._id}
                    className="suggestion-item"
                    onClick={() => handleSearchClick(item._id)}
                  >
                    {item.name}
                  </div>
                ))
              ) : (
                <div className="no-result">No results found</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="navbar-right">
        <Link to="/" title="Home"><FaHome className="nav-icon" /></Link>
        <Link to="/cart" title="Cart"><FaShoppingCart className="nav-icon" /></Link>
        <Link to="/orders" title="Orders"><FaClipboardList className="nav-icon" /></Link>
        {user && (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
