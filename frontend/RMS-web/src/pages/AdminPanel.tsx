import { useEffect, useState } from "react";
import appGlobal from "../utils/AppGlobal";
import { useAuthGuardPostLogin } from "../utils/ComponentsHelper/AuthGuard";
import { AuthHelper } from "../utils/AuthHelper";
import { useNavigate } from "react-router-dom";
import { HTTPHelper } from "../utils/HTTPHelper";
import UnderlineLink from "../components/UnderlineLink";
import NavBar from "../components/NavBar";

interface CurrentUsernameTypeResponse {
  username: string,
  userType: string;
}

interface AdminPanelProps {
  page: string;
}

const AdminPanel:React.FC<AdminPanelProps> = ({page}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useAuthGuardPostLogin();

  const handleClick = (label: string) => {
    alert(`Clicked ${label}`);
  };

  const navButtons = [
    { label: 'Job Applications', onClick: () => handleClick('job_applications') },
    { label: 'Follow-up History', onClick: () => handleClick('followup_history') }
  ];

  useEffect(() => {
    console.log("current page:", page);
    HTTPHelper.call<CurrentUsernameTypeResponse>(
      `${appGlobal.endpoint_auth}/getLoggedInUsernameType`,
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
    navigate("/");
  }

  return (
    <div>
      <div className="w-full bg-gradient-to-b from-gray-300 to-gray-100 flex flex-wrap items-center space-x-2">
        <h2 className="ml-2">Welcome! logged in as: {username}</h2>
        <UnderlineLink onClickHandler={handleLogout} >Logout</UnderlineLink>
        <NavBar buttons={navButtons} />
      </div>
    </div>
  );
}

export default AdminPanel;
