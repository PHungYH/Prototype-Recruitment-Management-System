import axios from "axios";
import { useEffect, useState } from "react";
import appGlobal from "../utils/AppGlobal";
import { useAuthGuardPostLogin } from "../utils/ComponentsHelper/AuthGuard";
import Button from "@mui/material/Button";

const EmployeePanel = () => {
  const [username, setUsername] = useState('');
  const [profileLastname, setProfileLastName] = useState('');
  const [profileFirstname, setProfileFirstName] = useState('');
  const [counter, setCounter] = useState(1);

  useAuthGuardPostLogin();

  useEffect(() => {
    const token = localStorage.getItem(appGlobal.storage_key_token);
    const userType = localStorage.getItem(appGlobal.storage_key_userType);
    axios.get(`${appGlobal.api_url}/getLoggedInUser?userType=${userType}`, {
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

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {profileLastname} {profileFirstname} (login: {username})!</h2>
      <Button onClick={() => setCounter(counter+1)}>{counter}</Button>
    </div>
  );
}

export default EmployeePanel;
