import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function FilterShown({persons}) {
	const [filter, setfilter] = useState("");

	const searchChange = (event) => {
		const filtrar = event.target.value.toLowerCase();
		setfilter(filtrar);
	};

	return (
		<section>
			<div>
				<label htmlFor="search-input">filter: </label>
				<input id="search-input" type="text" onChange={searchChange} name="search"/>
			</div>

			{persons.map((value) => {
				if (value.name.toLowerCase().includes(filter)) {		
					return <h3 key={value.id}>{value.name}, {value.number} </h3>;
				}
			})}
		</section>
	);
}
function Form({ handleChange, handleSubmit }) {
	return (
		<section>
			<h2>add a new</h2>
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
		</section>
	);
}

function PersonsList({ persons}) {
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
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};

		setPersons(persons.concat(personToAddToState));
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