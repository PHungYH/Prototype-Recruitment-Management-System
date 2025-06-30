import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';
import appGlobal from './utils/AppGlobal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path={`/${appGlobal.userType_ADMIN}`} element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
