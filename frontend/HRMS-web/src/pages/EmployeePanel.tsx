import axios from "axios";
import { useEffect, useState } from "react";
import appGlobal from "../utils/AppGlobal";
import { useNavigate } from "react-router-dom";
import { AuthHelper } from "../utils/AuthHelper";

const EmployeePanel = () => {
  const [needLogout, setNeedLogout] = useState(false);
  const [username, setUsername] = useState('');
  const [profileLastname, setProfileLastName] = useState('');
  const [profileFirstname, setProfileFirstName] = useState('');
  const navigation = useNavigate();

  useEffect(() => {
    AuthHelper.isLoggedIn().then((result) => {
      if (!result) {
        // alert('Session expired. Please login again.');
        setNeedLogout(true);
        AuthHelper.clearSession();
        navigation('/login');
      }
    })
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
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
      {!needLogout && <>
        <h2>Welcome, {profileLastname} {profileFirstname} (login: {username})!</h2>
      </>
      }

    </div>
  );
}

export default EmployeePanel;
