import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import appGlobal from './utils/AppGlobal';
import RegisterPage from './pages/RegisterPage';
import ApplicantPanelJobApplication from './pages/ApplicantPanelJobApplication';
import AdminPanelJobApplication from './pages/AdminPanelJobApplication';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path={`/${appGlobal.userType_ADMIN}/job_applications`} element={<AdminPanelJobApplication />} />
        <Route path={`/${appGlobal.userType_APPLICANT}/job_applications`} element={<ApplicantPanelJobApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
