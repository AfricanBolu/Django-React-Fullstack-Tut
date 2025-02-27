/** @format */

import "react";
import styles from "../styles/Notes.module.css";

const Notes = ({ note, onDelete }) => {
	const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

	return (
		<section className={styles.baseContainer}>
			<div className={styles.container}>
				<p className={styles.title}>{note.title}</p>
				<p className={styles.content}>{note.content}</p>
				<p className={styles.date}>{formattedDate}</p>
			</div>
			<button className={styles.btn} onClick={() => onDelete(note.id)}>
				Delete
			</button>
		</section>
	);
};

export default Notes;
