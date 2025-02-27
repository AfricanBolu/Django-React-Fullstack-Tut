/** @format */

/** @format */

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
	const [isAuth, setIsAuth] = useState(null);

	useEffect(() => {
		auth().catch(() => setIsAuth(false));
	}, []);

	const refreshToken = async () => {
		const refreshTkn = localStorage.getItem(REFRESH_TOKEN);

		try {
			const response = await api.post("/api/token/refresh/", {
				refresh: refreshTkn,
			});

			if (response.status === 200) {
				localStorage.setItem(ACCESS_TOKEN, response.data.access);
				setIsAuth(true);
			}
			setIsAuth(false);
		} catch (error) {
			console.log(error);
			setIsAuth(false);
		}
	};

	const auth = async () => {
		try {
			const token = localStorage.getItem(ACCESS_TOKEN);
			if (!token) {
				setIsAuth(false);
				return;
			}
			const decoded = jwtDecode(token);
			const tokenExp = decoded.exp;
			const now = Date.now() / 1000;

			if (tokenExp < now) await refreshToken();
			setIsAuth(true);
		} catch (error) {
			console.log(error);
			setIsAuth(false);
		}
	};

	if (isAuth === null) {
		return <div>Loading...</div>;
	}

	return isAuth ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
