import { useState } from "react";
import "./App.css";

function Anecdote({tilte, anecdote, voto}) {
	return(
		<section>
			<h2>{tilte}</h2>
			<p>{anecdote}</p>
			<p>{voto}</p>
		</section>
	);
}
function Button({callback, text}) {
	return (
		<button onClick={callback}>{text}</button>
	);
}

function App({anecdotes}) {

	const [selected, setSelected] = useState(0);
	const [votes, setvotes] = useState(new Uint8Array(anecdotes.length));
	const maxVotes = Math.max( ...votes );
	const mostVotedIndex = votes.indexOf(maxVotes);
	console.log(mostVotedIndex);

	const handleClickVotes = () => {
		const copy = [...votes];
		copy[selected] +=1;
		setvotes(copy);
	};

	function handleNextClick() {
		let numberRamdom =  Math.floor(Math.random() * (anecdotes.length - 0) + 0);
		setSelected(numberRamdom);
	}

	return (
		<>
			<Anecdote tilte={"Anecdote of the day"} anecdote={anecdotes[selected]} voto={`Has ${votes[selected]} votes`}/>
			<Button callback={handleClickVotes} text={"vote"}/>
			<Button callback={handleNextClick} text={"next anecdote"}/>
			<Anecdote tilte={"Anecdote with most votes"} anecdote={`Has ${votes[mostVotedIndex]} votes`} voto={anecdotes[mostVotedIndex]}/>
		</>
	);
}

export default App;
