import LoginForm from "../components/LoginForm";
import UnderlineLink from "../components/UnderlineLink";
import { useAuthGuardPreLogin } from "../utils/ComponentsHelper/AuthGuard";

const LoginPage = () => {
  useAuthGuardPreLogin();
  
  return (
    <div style={{ padding: '2rem' }}>
      <LoginForm/>
      <UnderlineLink href="/register">Or register here</UnderlineLink>
      <UnderlineLink className="ml-5" href="/">Return to home page</UnderlineLink>
    </div>
  );
}

export default LoginPage;
