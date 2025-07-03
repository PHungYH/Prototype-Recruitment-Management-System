// LoginForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appGlobal from '../utils/AppGlobal';
import { Button } from '@mui/material';
import { HTTPHelper } from '../utils/HTTPHelper';

interface LoginResponse {
  token: string;
}

const LoginForm = () => {
  const [usernameOrEmail, setUsernameEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(appGlobal.userType_APPLICANT);
  let navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await HTTPHelper.call<LoginResponse>(
        `${appGlobal.endpoint_auth}/login`,
        'POST',
        { userType, usernameOrEmail, password }
      );

      localStorage.setItem(appGlobal.storage_key_token, data.token);
      localStorage.setItem(appGlobal.storage_key_userType, userType);
      alert('Login successful!');

      navigate('/'+userType.toLowerCase()+'/job_applications')
    } catch (error) {
      console.log(error);
      alert('Login failed!');
    }
  };

  return (
    <div>
      <h2>Please login first</h2>
      <div className='flex flex-wrap items-center space-x-2'>
        <label>Login as:</label>
        <label>
          <input
            type="radio"
            value="applicant"
            checked={userType === appGlobal.userType_APPLICANT}
            onChange={() => setUserType(appGlobal.userType_APPLICANT)}
          />
          &nbsp;Applicant
        </label>
        <label>
          <input
            type="radio"
            value="employer"
            checked={userType === appGlobal.userType_ADMIN}
            onChange={() => setUserType(appGlobal.userType_ADMIN)}
          />
          &nbsp;Employer
        </label>
      </div>
      <input className='border border-solid' placeholder={"Username" + (userType == 'APPLICANT' ? ' or Email' : '')} onChange={e => setUsernameEmail(e.target.value)} />
      <input className='border border-solid m-2' type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

      <Button variant='contained' onClick={handleLogin}>Login</Button>
    </div>
  );
}

export default LoginForm;
