import { useState } from "react";
import "./App.css";

const App = () => {
	const [ persons, setPersons ] = useState([
		{ 
			id: 1,
			name: "Arto Hellas" 
		}
	]); 
	const [ newName, setNewName ] = useState("");

	const handleChange = (event) => {
		setNewName(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const personToAddToState = {
			id: persons.length + 1,
			name: newName
		};

		setPersons(persons.concat(personToAddToState));
		
	};

	return (
		<main>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
                    name: <input onChange={handleChange}/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>

			<section>
				<h2>Numbers</h2>
				{persons.map(value => {
					return <h3 key={value.id}>{value.name}</h3>;
				})}
			</section>
		</main>
	);
};

export default App;
