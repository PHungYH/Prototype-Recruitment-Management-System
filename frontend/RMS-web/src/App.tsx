import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import appGlobal from './utils/AppGlobal';
import RegisterPage from './pages/RegisterPage';
import AdminPanel from './pages/AdminPanel';
import ApplicantPanel from './pages/ApplicantPanel';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home loginMode = {false}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path={`/${appGlobal.userType_ADMIN}/job_applications`} element={<AdminPanel page='job_applications'/>} />
        <Route path={`/${appGlobal.userType_APPLICANT}/job_applications`} element={<ApplicantPanel page='job_applications'/>} />
        <Route path={`/${appGlobal.userType_APPLICANT}/application_history`} element={<ApplicantPanel page='application_history'/>} />
        <Route path={`/${appGlobal.userType_APPLICANT}/profile_management`} element={<ApplicantPanel page='profile_management'/>} />
      </Routes>
    </Router>
  );
}

export default App;
