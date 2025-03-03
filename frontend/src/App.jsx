import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If no user is found, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the children (protected route) if the user is authenticated
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navdashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const Navdashboard = () => {
  const { user } = useContext(AuthContext);

  // If the user is logged in, redirect to the dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // If the user is not logged in, redirect to the login page
  return <Navigate to="/signup" replace />;
};

export default App;
