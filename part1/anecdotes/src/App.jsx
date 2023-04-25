import { useState } from 'react'
import './App.css'

function App({anecdotes}) {
  const [selected, setSelected] = useState(0)
  const [votes, setvotes] = useState(new Uint8Array(anecdotes.length))

  const handleClickVotes = () => {
    const copy = [...votes]
    copy[selected] +=1
    setvotes(copy)
  }

  function handleClickNext() {
    let numberRamdom =  Math.floor(Math.random() * (anecdotes.length - 0) + 0)
    setSelected(numberRamdom)
  }

  return (
    <>
      <h2>{anecdotes[selected]}</h2>
      <p>Has {votes[selected]} votes</p>
      <button onClick={handleClickVotes}>vote</button>
      <button onClick={handleClickNext}>next anecdote</button>
    </>
  )
}

export default App
