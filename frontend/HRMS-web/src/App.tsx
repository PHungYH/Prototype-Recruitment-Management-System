import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import EmployeePanel from './pages/EmployeePanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employeePanel" element={<EmployeePanel />} />
      </Routes>
    </Router>
  );
}

export default App;
