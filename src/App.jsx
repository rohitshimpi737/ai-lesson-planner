import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import Login from "./pages/Login";
import LessonPlanner from "./pages/LessonPlanner";
import Home from "./pages/Home"; // Import Home page
const isAuthenticated = () => !!localStorage.getItem("isAuthenticated");


  export default function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/lesson-planner"
            element={isAuthenticated() ? <LessonPlanner /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    );
}
