// src/context/UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  );

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        return true;
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong during login.');
    }
    return false;
  };

  const register = async (name, email, password) => {
  try {
    const res = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })  // ✅ Keys must match backend
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      return true;
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (err) {
    console.error('Registration error:', err);
    alert('Something went wrong during registration.');
  }
  return false;
};



  useEffect(() => {
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
