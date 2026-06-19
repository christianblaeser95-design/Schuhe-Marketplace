import { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    // Implement Google OAuth sign-in
    // Call API endpoint /api/auth/google
    setLoading(false);
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    // Implement Facebook OAuth sign-in
    // Call API endpoint /api/auth/facebook
    setLoading(false);
  };

  const handleWeb3Login = async () => {
    setLoading(true);
    // Implement Web3 wallet connect
    // Call API endpoint /api/auth/web3-connect
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Schuhe Marketplace</h1>
      <button onClick={handleGoogleLogin} disabled={loading}>Google Login</button>
      <button onClick={handleFacebookLogin} disabled={loading}>Facebook Login</button>
      <button onClick={handleWeb3Login} disabled={loading}>Web3 Wallet</button>
    </div>
  );
}
