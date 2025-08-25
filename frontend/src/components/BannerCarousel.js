// src/components/BannerCarousel.js
import React from 'react';
import './BannerCarousel.css'; // You'll create this CSS file

const banners = [
  {
    image: '/images/products/banner1.png',
    alt: 'Black Friday',

  },
  {
    image: '/images/products/Banner2.png',
    alt: 'Burger King',

  },
  {
    image: '/images/products/banner3.png',
    alt: 'Furniture Fest',

  },
];

const BannerCarousel = () => {
  return (
    <div className="carousel-container">
      {banners.map((banner, index) => (
        <div key={index} className="banner">
          <img src={banner.image} alt={banner.alt} />

        </div>
      ))}
    </div>
  );
};

export default BannerCarousel;
