export function ContactsList({ contacts}) {
	return (
		<section>
			<h2>Numbers</h2>
			{contacts.map((value) => {
				return <h3 key={value.id}>{value.name}, {value.number} </h3>;
			})}
		</section>
	);
}