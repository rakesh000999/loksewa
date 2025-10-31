import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const login = async (email, password) => {
        // POST to backend login endpoint which authenticates by email and returns tokens
        const response = await api.post("/accounts/login/", { email, password });
        const data = response.data;
        // backend returns username and email along with tokens
        const userObj = { username: data.username, email: data.email };
        setUser(userObj);
        setToken(data.access);
        localStorage.setItem("user", JSON.stringify(userObj));
        localStorage.setItem("token", data.access);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const register = async (username, email, password) => {
        await api.post("/accounts/register/", { username, email, password });
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
