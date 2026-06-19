import ProductList from '../components/Products/ProductList';

export default function HomePage() {
  return (
    <div>
      <header style={{ background: '#333', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <h1>Schuhe Marketplace</h1>
      </header>
      <ProductList />
    </div>
  );
}
