/**
 * eslint-disable react/prop-types
 *
 * @format
 */

/** @format */
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import styles from "../styles/Form.module.css";
import LoadingIndicator from "./LoadingIndicator";

const Form = ({ route, method }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const Navigate = useNavigate();

	const name = method === "login" ? "Login" : "Register";

	const handleSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();

		try {
			const res = await api.post(route, { username, password });
			if (method === "login") {
				localStorage.setItem(ACCESS_TOKEN, res.data.access);
				localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
				Navigate("/");
			} else Navigate("/login");
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className={styles.formContainer} onSubmit={handleSubmit}>
			<h1>{name}</h1>
			<input
				type="text"
				className={styles.formInput}
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>
			<input
				type="password"
				className={styles.formInput}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			{loading && <LoadingIndicator />}
			<button className={styles.formBtn} type="submit">
				{name}
			</button>
		</form>
	);
};

export default Form;
