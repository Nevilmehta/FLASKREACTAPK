import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Signup.css"; // Ensure styles are imported

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // State to hold success or error message
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear any previous message

        try {
            await signup(username, email, password);
            setMessage("Signup successful! Please log in.");
            setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
            navigate("/login"); // Redirect after signup
        } catch (error) {
            setMessage(error.response?.data?.message || "Signup failed. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Signup</button>

                    {/* Conditionally render the message below the button */}
                    {message && (
                        <p className={`message ${message.includes("failed") ? "error" : ""}`}>
                            {message}
                        </p>
                    )}
                </form>

                {/* Sign In hyperlink */}
                <div className="signin-redirect">
                    <p>Already have an account? <Link to="/login" className="signin-link">Sign in here</Link></p>
                </div>
            </div>
        </div>
    );
}
