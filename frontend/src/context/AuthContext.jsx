import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    // Check if user is logged in on app load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("http://127.0.0.1:5000/user", { 
                headers: { 'Authorization': `Bearer ${token}` },
            })
            .then(response => {
                setUser(response.data.user); 
            })
            .catch(() => {
                logout(); 
            })
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    // Signup functionality
    const signup = async (username, email, password) => {
        try {
            await axios.post("http://127.0.0.1:5000/signup", { username, email, password });
            alert("Signup successful! Please log in.");
        } catch (error) {
            console.error("Signup failed!", error);
            throw error;
            alert(error.response?.data?.message || "Signup failed");
        }
    };

    // Login functionality
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:5000/login", { email, password });
            const { access_token, user } = response.data;

            localStorage.setItem("token", access_token);
            setUser(user);
        } catch (error) {
            console.error("Login failed!", error);
            alert(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    // Logout functionality
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
