// LoginForm.jsx
import { useState } from 'react';
import axios from 'axios';
import appGlobal from '../utils/AppGlobal';

const LoginForm = () => {
  const [usernameOrEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${appGlobal.getApiUrl()}/login`, {
        usernameOrEmail,
        password,
      });
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <div>
      <input placeholder="Username or Email" onChange={e => setUsernameEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginForm;
