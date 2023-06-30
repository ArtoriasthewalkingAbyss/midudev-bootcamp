import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { FilterShown } from "./components/FilterShown.jsx";
import { Form } from "./components/Form.jsx";
import { PersonsList } from "./components/PersonsList.jsx";

function App() {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((response) => {
			const {data} = response;
			setPersons(data);
		});
	}, []);

	const handleChange = (event) => {
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
			name: newName,
			number: newNumber,
		};

		axios.post("http://localhost:3001/persons", personToAddToState).then((response) => {
			const {data} = response;
			
			setPersons((prevPersons) => prevPersons.concat(data));
		});

	};

	return (
		<main>
			<h2>Phonebook</h2>
			<FilterShown persons={persons}/>
			<Form handleChange={handleChange} handleSubmit={handleSubmit} />
			<PersonsList persons={persons}/>
		</main>
	);
}

export default App;