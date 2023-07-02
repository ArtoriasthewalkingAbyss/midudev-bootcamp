import { useState } from "react";

export function FilterShown({contacts}) {
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

			{contacts.map((value) => {
				if (value.name.toLowerCase().includes(filter)) {		
					return <h3 key={value.id}>{value.name}, {value.number} </h3>;
				}
			})}
		</section>
	);
}