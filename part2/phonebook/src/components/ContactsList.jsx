export function ContactsList({ contacts, removeContact }) {
	return (
		<section>
			<h2>Numbers</h2>
			{contacts.map((value) => {
				return (
					<section key={value.id}>
						<h3>{value.name}, {value.number} </h3>
						<button onClick={() => removeContact(value.id, value.name)}>delete</button>
					</section>
					
				);
			})}
		</section>
	);
}