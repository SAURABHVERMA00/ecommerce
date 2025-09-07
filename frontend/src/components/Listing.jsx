import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Listing() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ name: '', category: '', priceMin: '', priceMax: '' });
  const { addToCart } = useCart();

  const fetchItems = async () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => v && params.append(k, v));
    const res = await fetch(`${API}/items?${params}`);
    setItems(await res.json());
  };

  useEffect(() => { fetchItems(); }, [filters]);

  return (
    <div>
      <div className="brand">ShopEase</div>
      <div className="filters">
        <input placeholder="Name" value={filters.name} onChange={e => setFilters(f => ({ ...f, name: e.target.value }))} />
        <input placeholder="Category" value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))} />
        <input placeholder="Min Price" type="number" value={filters.priceMin} onChange={e => setFilters(f => ({ ...f, priceMin: e.target.value }))} />
        <input placeholder="Max Price" type="number" value={filters.priceMax} onChange={e => setFilters(f => ({ ...f, priceMax: e.target.value }))} />
        <button onClick={fetchItems}>Filter</button>
      </div>
      <div className="product-list">
        {items.length === 0 && <div className="empty">No products found.</div>}
        {items.map(item => (
          <div className="product-card" key={item._id}>
            <div className="product-info">
              <span className="product-title">{item.name}</span>
              <span className="product-category">{item.category}</span>
              <span className="product-desc">{item.description}</span>
              <span className="product-price">${item.price}</span>
            </div>
            <button className="add-btn" onClick={() => addToCart(item, 1)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
