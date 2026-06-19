import { useState, useEffect } from 'react';
import { getProduct } from '../../services/apiService';

export default function ProductDetail({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(productId).then(setProduct);
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Size: {product.size}</p>
      <p>Condition: {product.condition}</p>
      <button>Buy Now</button>
      <button>Message Seller</button>
    </div>
  );
}
