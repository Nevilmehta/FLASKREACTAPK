import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; // Import the CSS file

export default function Dashboard() {
    const { user, logout, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        navigate("/login");
        return null; // Or return a redirect or another loading state
    }

    console.log(user); // Debug log to check user object

    return (
        <div className="dashboard-container">
            {/* Navbar */}
            <div className="navbar">
                <div className="brand">Teknobu</div>
                <div className="nav-links">
                    <span>Welcome, {user.username || "Guest"}</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </div>

            <div className="content">
                <h1>Welcome, {user.username || "Guest"}!</h1> {/* Displaying username */}
            </div>
        </div>
    );
}
