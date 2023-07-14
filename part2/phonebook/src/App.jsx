import { useEffect, useState } from "react";
import "./App.css";
import { FilterShown } from "./components/FilterShown.jsx";
import { Form } from "./components/Form.jsx";
import { ContactsList } from "./components/ContactsList.jsx";
import { getAllContacts, createContacts, deleteContact } from "./services/contacts/index.js";

function App() {
	const [contacts, setContacts] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	useEffect(() => {
		getAllContacts().then((contacts) => {
			setContacts(contacts);
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

		if (contacts.some((value) => value.name === newName || value.number === newNumber)) {
			alert(newName + "ya esta agregado a su agenda");
			return;
		}

		const contactsToAddToState = {
			name: newName,
			number: newNumber,
		};

		createContacts(contactsToAddToState).then((newContacts) => {
			setContacts((prevContacts) => prevContacts.concat(newContacts));
		});

	};

	const removeContact = (id, name) => {
		if (confirm("Delete " + name )) {
			return deleteContact(id).then(() => {
				setContacts(contacts.filter(contact => contact.id !== id));
			});
			
		}
	};
	
	return (
		<main>
			<h2>Phonebook</h2>
			<FilterShown contacts={contacts}/>
			<Form handleChange={handleChange} handleSubmit={handleSubmit} />
			<ContactsList contacts={contacts} removeContact={removeContact}/>
		</main>
	);
}

export default App;