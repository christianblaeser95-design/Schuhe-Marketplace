import { useState, useEffect } from 'react';
import { fetchProducts } from '../../services/apiService';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Shoes</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h3>{p.title}</h3>
            <p>${p.price}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}
