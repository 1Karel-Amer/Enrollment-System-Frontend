import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner"; // 1. Import the Toaster!

import Login from "./pages/Login";
import Home from "./pages/Home";
import StudentProfile from "./pages/StudentProfile";

function App() {
  return (
    <Router>
      {/* 2. Add it here! richColors makes success green and errors red automatically */}
      <Toaster position="top-right" richColors />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/students/:id" element={<StudentProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
