import RegistrationForm from "../components/RegistrationForm";
import { useAuthGuardPreLogin } from "../utils/ComponentsHelper/AuthGuard";

const RegisterPage = () => {
  useAuthGuardPreLogin();
  
  return (
    <div style={{ padding: '2rem' }}>
      <RegistrationForm/>
    </div>
  );
}

export default RegisterPage;
