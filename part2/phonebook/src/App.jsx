import { useState } from "react";
import "./App.css";

function Form({ handleChange, handleSubmit }) {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name-input">Name:</label>
				<input id="name-input" type="text" onChange={handleChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
}

function PersonsList({ persons }) {
	return (
		<section>
			<h2>Numbers</h2>
			{persons.map((value) => {
				return <h3 key={value.id}>{value.name}</h3>;
			})}
		</section>
	);
}

function App() {
	const [persons, setPersons] = useState([
		{
			id: 1,
			name: "Arto Hellas",
		},
	]);
	const [newName, setNewName] = useState("");

	const handleChange = (event) => {
		setNewName(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (persons.some((value) => value.name === newName)) {
			alert(newName + "ya esta agregado a su agenda");
			return;
		}

		const personToAddToState = {
			id: persons.length + 1,
			name: newName,
		};

		setPersons(persons.concat(personToAddToState));
	};

	return (
		<main>
			<h2>Phonebook</h2>
			<Form handleChange={handleChange} handleSubmit={handleSubmit} />
			<PersonsList persons={persons} />
		</main>
	);
}

export default App;
