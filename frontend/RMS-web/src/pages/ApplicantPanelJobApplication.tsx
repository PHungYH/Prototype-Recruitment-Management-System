import { useEffect, useState } from "react";
import appGlobal from "../utils/AppGlobal";
import { useAuthGuardPostLogin } from "../utils/ComponentsHelper/AuthGuard";
import { AuthHelper } from "../utils/AuthHelper";
import { useNavigate } from "react-router-dom";
import { HTTPHelper } from "../utils/HTTPHelper";
import UnderlineLink from "../components/UnderlineLink";
import NavBar from "../components/NavBar";

interface CurrentUsernameResponse {
  username: string;
}

const ApplicantPanelJobApplication = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useAuthGuardPostLogin();

  const handleClick = (label: string) => {
    alert(`Clicked ${label}`);
  };

  const navButtons = [
    { label: 'Job Applications', onClick: () => handleClick('job_applications') },
    { label: 'Application History', onClick: () => handleClick('application_history') },
    { label: 'Profile Management', onClick: () => handleClick('profile_management') },
  ];

  useEffect(() => {
    HTTPHelper.call<CurrentUsernameResponse>(
      `${appGlobal.endpoint_auth}/getLoggedInUsername?userType=${appGlobal.userType_APPLICANT}`,
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
    <div>
      <div className="w-full bg-gradient-to-b from-gray-300 to-gray-100 flex flex-wrap items-center space-x-2">
        <h2 className="ml-2">Welcome! logged in as: {username}</h2>
        <UnderlineLink onClickHandler={handleLogout} >Logout</UnderlineLink>
        <NavBar buttons={navButtons} />
      </div>
    </div>
  );
}

export default ApplicantPanelJobApplication;
