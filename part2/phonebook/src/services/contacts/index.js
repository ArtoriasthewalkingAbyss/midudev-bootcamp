import axios from "axios";
const baseUrl = "/api/persons";

const getAllContacts = () => {
	return axios.get(baseUrl)
		.then((response) => {
			const {data} = response;
			return data;
		});
};

const createContacts = ({name, number}) => {
	return axios.post(baseUrl, {name, number})
		.then((response) => {
			const {data} = response;
			return data;
		});
};

function deleteContact(id) {
	return axios.delete(`${baseUrl}/${id}`).then((response) => {
		const {data} = response;
		return data;
	});
}

function updateContact(contact) {
	return axios.put(`${baseUrl}/${contact.id}`, contact).then((response) => {
		const {data} = response;
		return data;
	});
}

export {getAllContacts, createContacts, deleteContact, updateContact};