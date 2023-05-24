import { useState } from "react";
import "./App.css";

function Form({ handleChange, handleSubmit }) {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name-input">Name: </label>
				<input id="name-input" type="text" onChange={handleChange} name="name"/>
			</div>
			<div>
				<label htmlFor="number-input">Number: </label>
				<input id="number-input" type="number" onChange={handleChange} name="number"/>
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
				return <h3 key={value.id}>{value.name}, {value.number} </h3>;
			})}
		</section>
	);
}

function App() {
	const [persons, setPersons] = useState([
		{
			id: 1,
			name: "Arto Hellas",
			number: 454687461687
		},
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const handleChange = (event) => {
		console.log(event);
		const { name, value } = event.target;
		if (name === "name") {
			setNewName(value);
		} else if (name === "number") {
			setNewNumber(value);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (persons.some((value) => value.name === newName || value.number === newNumber)) {
			alert(newName + "ya esta agregado a su agenda");
			return;
		}

		const personToAddToState = {
			id: persons.length + 1,
			name: newName,
			number: newNumber,
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