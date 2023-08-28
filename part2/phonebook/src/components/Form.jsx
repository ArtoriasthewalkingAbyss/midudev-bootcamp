export function Form({ handleChange, handleSubmit }) {
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
					<input id="number-input" type="text" onChange={handleChange} name="number"/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</section>
	);
}