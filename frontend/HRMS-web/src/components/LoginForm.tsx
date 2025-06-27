// LoginForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import appGlobal from '../utils/AppGlobal';
import { Button, Checkbox } from '@mui/material';

const LoginForm = () => {
  const [usernameOrEmail, setUsernameEmail] = useState('');
  const [userType, setUserType] = useState("EMPLOYEE");
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${appGlobal.api_url}/login`, {
        userType,
        usernameOrEmail,
        password,
      });
      localStorage.setItem(appGlobal.storage_key_token, response.data.token);
      localStorage.setItem(appGlobal.storage_key_userType, userType);
      alert('Login successful!');
      
      navigate('/EmployeePanel')
    } catch (error) {
      console.log(error);
      alert('Login failed!');
    }
  };

  return (
    <div>
      <input className='border border-solid' placeholder="Username or Email" onChange={e => setUsernameEmail(e.target.value)} />
      <input className='border border-solid m-2' type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <div><Checkbox onChange={() => setUserType(userType === 'EMPLOYEE'? 'APPLICANT' : 'EMPLOYEE')}/>login as applicant</div>
      
      <Button variant='contained' onClick={handleLogin}>Login</Button>
    </div>
  );
}

export default LoginForm;
