import { useEffect, useState } from "react";
import appGlobal from "../utils/AppGlobal";
import { useAuthGuardPostLogin } from "../utils/ComponentsHelper/AuthGuard";
import Button from "@mui/material/Button";
import { AuthHelper } from "../utils/AuthHelper";
import { useNavigate } from "react-router-dom";
import { HTTPHelper } from "../utils/HTTPHelper";

interface CurrentUsernameResponse {
  username: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useAuthGuardPostLogin();

  useEffect(() => {
    HTTPHelper.call<CurrentUsernameResponse>(
      `${appGlobal.endpoint_auth}/getLoggedInUsername?userType=${appGlobal.userType_ADMIN}`,
      'GET'
    ).then((response) => {
      setUsername(response?.username);
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });

  }, []);

  const handleLogout = () => {
    AuthHelper.clearSession();
    alert("You are now logged out.");
    navigate("/login");
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div className="flex flex-wrap items-center space-x-2">
        <h2>Welcome, logged in as: {username}!</h2>
        <Button variant='contained' onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}

export default AdminPanel;
