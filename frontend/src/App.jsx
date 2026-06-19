import { useState } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './components/Auth/LoginPage';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return <LoginPage onLogin={(newToken) => {
      setToken(newToken);
      localStorage.setItem('token', newToken);
    }} />;
  }

  return <HomePage />;
}
