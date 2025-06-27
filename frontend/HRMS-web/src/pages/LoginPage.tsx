import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { AuthHelper } from "../utils/AuthHelper";
import appGlobal from "../utils/AppGlobal";

const LoginPage = () => {
  const navigation = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem(appGlobal.storage_key_userType);
    AuthHelper.isLoggedIn().then((result) => {
      if (result)
        navigation(userType == 'EMPLOYEE' ? '/employeePanel' : 'applicantPanel');
      else
        AuthHelper.clearSession();  
    })
  }, []);
  
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Please login first</h2>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
