export function PersonsList({ persons}) {
	return (
		<section>
			<h2>Numbers</h2>
			{persons.map((value) => {
				return <h3 key={value.id}>{value.name}, {value.number} </h3>;
			})}
		</section>
	);
}