/** @format */

import { useState, useEffect } from "react";
import api from "../api";
import Notes from "../components/Notes";
import styles from "../styles/Home.module.css";

const Home = () => {
	const [notes, setNotes] = useState([]);
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");

	useEffect(() => {
		fetchNotes();
	}, []);
	const fetchNotes = () => {
		api
			.get("/api/notes/")
			.then((res) => res.data)
			.then((data) => {
				setNotes(data);
				console.log(data);
			})
			.catch((err) => alert(err));
	};

	const deleteNote = (id) => {
		api
			.delete(`/api/notes/delete/${id}/`)
			.then((res) => {
				if (res.status === 204) alert("Note deleted");
				else alert("Error!!! Failed to delete note");
				console.log(res);
				fetchNotes();
			})
			.catch((err) => alert(err));
	};

	const createNote = (e) => {
		e.preventDefault();
		api
			.post("/api/notes/", { content, title })
			.then((res) => {
				if (res.status === 201) alert("Note created");
				else alert("Error!!! Failed to create note");
				// console.log(res);
				fetchNotes();
			})
			.catch((err) => alert(err));
	};
	return (
		<section>
			<div className={styles.notesSection}>
				<h2>Notes</h2>
				{notes.map((note) => (
					<Notes
						note={note}
						key={note.id}
						onDelete={deleteNote}
						className={styles.note}
					/>
				))}
			</div>
			<h2>Create a new note</h2>
			<form onSubmit={createNote}>
				<label htmlFor="title">Title:</label>
				<br />
				<input
					type="text"
					id="title"
					name="title"
					required
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<label htmlFor="content">Content:</label>
				<br />
				<textarea
					name="content"
					id="content"
					required
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<br />
				<input type="submit" value="Submit" />
			</form>
		</section>
	);
};

export default Home;
