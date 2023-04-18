import React, { useState, StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { SectionFeedback } from './SectionFeedback'
import { SectionStatisties } from './SectionStatisties'

const root = ReactDOM.createRoot(document.getElementById('root'))

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <main>
      <SectionFeedback good={{good, setGood}} neutral={{neutral, setNeutral}} bad={{bad, setBad}}/>
      <SectionStatisties good={good} neutral={neutral} bad={bad}/>
    </main>
  )
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>
  )
