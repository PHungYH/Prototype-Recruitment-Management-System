import { useNavigate } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import UnderlineLink from "../components/UnderlineLink";
import { useAuthGuardPreLogin } from "../utils/ComponentsHelper/AuthGuard";

const RegisterPage = () => {
  const navigate = useNavigate();
  useAuthGuardPreLogin();
  
  const handleBackToLogin = () => {
    navigate('/login');
  }

  return (
    <div style={{ padding: '2rem' }}>
      <RegistrationForm/>
      <div className="flex justify-center mt-2"><UnderlineLink onClickHandler={handleBackToLogin}>Back to login</UnderlineLink></div>
    </div>
  );
}

export default RegisterPage;
