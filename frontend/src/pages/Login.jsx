import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css"; // Use the same styles for consistency

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed. Try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Login</button>

                    {message && <p className="message">{message}</p>}
                </form>

                {/* Signup Link */}
                <p className="signup-link">
                    Don't have an account? <Link to="/signup" className="link">Sign up here</Link>
                </p>
            </div>
        </div>
    );
}
