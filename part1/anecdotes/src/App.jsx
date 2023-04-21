import { useState } from 'react'
import './App.css'

function App({anecdotes}) {
  const [selected, setSelected] = useState(0)

  function handleClick() {
    let numberRamdom =  Math.floor(Math.random() * (anecdotes.length - 0) + 0)
    console.log(numberRamdom)
    setSelected(numberRamdom)
  }

  return (
    <>
      <h2>{anecdotes[selected]}</h2>
      <button onClick={handleClick}>next anecdote</button>
    </>
  )
}

export default App
