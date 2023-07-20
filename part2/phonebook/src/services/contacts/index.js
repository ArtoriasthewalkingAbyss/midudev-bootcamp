import axios from "axios";

const getAllContacts = () => {
	return axios.get("http://localhost:3001/persons")
		.then((response) => {
			const {data} = response;
			return data;
		});
};

const createContacts = ({name, number}) => {
	return axios.post("http://localhost:3001/persons", {name, number})
		.then((response) => {
			const {data} = response;
			return data;
		});
};

function deleteContact(id) {
	return axios.delete(`http://localhost:3001/persons/${id}`).then((response) => {
		const {data} = response;
		return data;
	});
}

function updateContact(contact) {
	return axios.put(`http://localhost:3001/persons/${contact.id}`, contact).then((response) => {
		const {data} = response;
		return data;
	});
}

export {getAllContacts, createContacts, deleteContact, updateContact};