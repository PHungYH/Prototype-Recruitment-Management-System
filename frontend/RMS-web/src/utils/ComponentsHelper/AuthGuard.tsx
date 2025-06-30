import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHelper } from '../AuthHelper';
import appGlobal from '../AppGlobal';

const useAuthGuardPreLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Check session");
    AuthHelper.isLoggedIn().then((result) => {
      if (result) {
        navigate(`/${localStorage.getItem(appGlobal.storage_key_userType)?.toLowerCase()}`);
      } else
        AuthHelper.clearSession();  
    })
  }, [navigate]);
};

const useAuthGuardPostLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Check session");
    AuthHelper.isLoggedIn().then((result) => {
      if (!result) {
        alert('Session expired. Please login again.');
        AuthHelper.clearSession();
        navigate('/login');
      }
    });
  }, [navigate]);
};

export {useAuthGuardPreLogin, useAuthGuardPostLogin};