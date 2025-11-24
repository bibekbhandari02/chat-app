import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

	useEffect(() => {
		// Verify token validity on mount and periodically
		const verifyAuth = async () => {
			try {
				const res = await fetch("/api/auth/verify", {
					method: "GET",
					credentials: "include",
				});
				
				if (!res.ok) {
					// Token is invalid or expired
					localStorage.removeItem("chat-user");
					setAuthUser(null);
				}
			} catch (error) {
				// Network error or server down - keep user logged in
				console.error("Auth verification failed:", error);
			}
		};

		if (authUser) {
			verifyAuth();
		}
	}, [authUser]);

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};