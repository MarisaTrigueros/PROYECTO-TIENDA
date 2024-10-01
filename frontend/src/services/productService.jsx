// src/services/productService.js
const API_URL = "http://localhost:5000/api/products";

export const getProducts = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
