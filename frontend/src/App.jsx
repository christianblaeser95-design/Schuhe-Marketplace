import { useState } from 'react';
import HomePage from './pages/HomePage';
import LoginForm from './components/Auth/LoginForm';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return <LoginForm onLogin={(newToken) => {
      setToken(newToken);
      localStorage.setItem('token', newToken);
    }} />;
  }

  return <HomePage />;
}
