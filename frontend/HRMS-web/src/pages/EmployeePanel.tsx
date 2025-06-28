import axios from "axios";
import { useEffect, useState } from "react";
import appGlobal from "../utils/AppGlobal";
import { useAuthGuardPostLogin } from "../utils/ComponentsHelper/AuthGuard";
import Button from "@mui/material/Button";
import { AuthHelper } from "../utils/AuthHelper";
import { useNavigate } from "react-router-dom";

const EmployeePanel = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [profileLastname, setProfileLastName] = useState('');
  const [profileFirstname, setProfileFirstName] = useState('');;

  useAuthGuardPostLogin();

  useEffect(() => {
    const token = localStorage.getItem(appGlobal.storage_key_token);
    const userType = localStorage.getItem(appGlobal.storage_key_userType);
    axios.get(`${appGlobal.api_url}${appGlobal.endpoint_auth}/getLoggedInUser?userType=${userType}`, {
      headers: { token: token }
    })
      .then((response) => {
        const d = response.data;
        console.log("Data:", d);
        setProfileLastName(d?.profileLastName);
        setProfileFirstName(d?.profileFirstName);
        setUsername(d?.userName);
      })
      .catch((error) => {
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
        <h2>Welcome, {profileLastname} {profileFirstname} (login: {username})!</h2>
        <Button variant='contained' onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}

export default EmployeePanel;
