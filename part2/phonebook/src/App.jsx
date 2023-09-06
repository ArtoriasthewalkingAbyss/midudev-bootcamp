import { useEffect, useState } from "react";
import "./style/App.css";
import "./style/Notification.css";
import { getAllContacts, createContacts, deleteContact, updateContact } from "./services/contacts/index.js";
import { FilterShown } from "./components/FilterShown.jsx";
import { Form } from "./components/Form.jsx";
import { ContactsList } from "./components/ContactsList.jsx";
import { Notification } from "./components/Notification.jsx";

function App() {
	const [contacts, setContacts] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [notification, setNotification] = useState("");

	useEffect(() => {
		getAllContacts().then((contacts) => {
			setContacts(contacts);
		}).catch((error) => {
			setNotification("Error al obtener los contactos" + error);
		});
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setNotification("");
		}, 5000);
		return () => clearTimeout(timer);
	}, [notification]);

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

		if (contacts.some((value) => value.name === newName && value.number === newNumber)) {
			alert(newName + "ya esta agregado a su agenda");
			return;
		} else if (contacts.some((value) => value.name === newName && value.number !== newNumber)) {
			if (confirm(newName + " esta en su agenda, ¿quiere remplazar el viejo numero por el nuevo?")) {
				let contact = contacts.find(c => c.name === newName);
				let contactNewNumber = {...contact, number: newNumber};
				return updateContact(contactNewNumber).then(response => {
					setNotification("Update " + response.name);
					
					setContacts((prevContacts) => prevContacts.map(cont => cont.name !== newName ? cont : response));
				}) .catch((error) => {
					setNotification(`Error al actualizar a ${contactNewNumber.name} tipo de error: ` + error);
				});
				
			} else {
				return;
			}
		}

		const contactToAddToState = {
			name: newName,
			number: newNumber,
		};

		createContacts(contactToAddToState).then((newContacts) => {
			setNotification("Added " + newContacts.name);

			setContacts((prevContacts) => prevContacts.concat(newContacts));
		}).catch((error) => {
			setNotification(`Error al crear a el contacto ${contactToAddToState.name} tipo de error: ` + error.response.data.error);
		});

	};

	const removeContact = (id, name) => {
		if (confirm("Delete " + name )) {
			return deleteContact(id).then(() => {
				setNotification("Delete " + name);

				setContacts(contacts.filter(contact => contact.id !== id));
			}).catch((error) => {
				setNotification(`Error al eliminar a ${name} tipo de error: ` + error);
			});
			
		}
	};

	return (
		<main>
			<h2>Phonebook</h2>
			{notification ? <Notification notification={notification}/> : null}
			<FilterShown contacts={contacts}/>
			<Form handleChange={handleChange} handleSubmit={handleSubmit} />
			<ContactsList contacts={contacts} removeContact={removeContact}/>
		</main>
	);
}

export default App;