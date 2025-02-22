import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import LessonPlanner from "./pages/LessonPlanner";
import Home from "./pages/Home"; // Import Home page
const isAuthenticated = () => !!localStorage.getItem("isAuthenticated");

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/lesson-planner"
          element={
            isAuthenticated() ? (
              <LessonPlanner />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
