import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

      const host = 'http://localhost:5000';
    // const host = import.meta.env.VITE_BACKEND_URL;

    // jab app load ho to backend se check karo cookie valid hai ya nahi
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${host}/api/admin/check-auth`, {
                    method: "GET",
                    credentials: "include", 
                });

                if (res.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [host]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
