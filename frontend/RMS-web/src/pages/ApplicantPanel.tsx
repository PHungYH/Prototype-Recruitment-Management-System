import { useEffect, useState } from "react";
import appGlobal from "../utils/AppGlobal";
import { useAuthGuardPostLogin } from "../utils/ComponentsHelper/AuthGuard";
import { AuthHelper } from "../utils/AuthHelper";
import { useNavigate } from "react-router-dom";
import { HTTPHelper } from "../utils/HTTPHelper";
import UnderlineLink from "../components/UnderlineLink";
import NavBar from "../components/NavBar";
import ProfileManagementForm from "../components/ProfileManagementForm";

interface CurrentUsernameTypeResponse {
  username: string,
  userType: string;
}

interface ApplicantPanelProps {
  page: string;
}

const ApplicantPanel:React.FC<ApplicantPanelProps> = ({page}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [showJobApplications, setShowJobApplications] = useState(false);
  const [showApplicationHistory, setShowAppplicationHistory] = useState(false);
  const [showProfileManagement, setShowProfileManagement] = useState(false);

  useAuthGuardPostLogin();

  const loadContent = (label: string) => {
    // Reset all componenets
    setShowJobApplications(false);
    setShowAppplicationHistory(false);
    setShowProfileManagement(false);

    navigate(`/${appGlobal.userType_APPLICANT.toLowerCase()}/${label}`)

    // Show component by label
    switch (label) {
      case 'job_applications':
        setShowJobApplications(true);
        break;
      case 'application_history':
        setShowAppplicationHistory(true);
        break;
      case 'profile_management':
        setShowProfileManagement(true);
        break;
    }
  }

  const navButtons = [
    { label: 'Job Applications', onClick: () => loadContent('job_applications') },
    { label: 'Application History', onClick: () => loadContent('application_history') },
    { label: 'Profile Management', onClick: () => loadContent('profile_management') },
  ];

  useEffect(() => {
    console.log("current page:", page);
    loadContent(page);
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
      <div>
        {showJobApplications && <h1>A</h1>}
        {showApplicationHistory && <h1>B</h1>}
        {showProfileManagement && <ProfileManagementForm/>}
      </div>
    </div>
  );
}

export default ApplicantPanel;
