import LoginForm from "../components/LoginForm";
import { useAuthGuardPreLogin } from "../utils/ComponentsHelper/AuthGuard";

const LoginPage = () => {
  useAuthGuardPreLogin();
  
  return (
    <div style={{ padding: '2rem' }}>
      <LoginForm/>
    </div>
  );
}

export default LoginPage;
