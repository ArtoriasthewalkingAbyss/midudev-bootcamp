import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => <h1>{course}</h1>

const Content = ({part, exercises}) => {

  return (
    <>
      <p>
        {part.part1} {exercises.exercises1}
      </p>

      <p>
        {part.part2} {exercises.exercises2}
      </p>

      <p>
        {part.part3} {exercises.exercises3}
      </p>
    </>
  )
}

const Total = ({exercises}) => <p>Number of exercises {exercises.exercises1 + exercises.exercises2 + exercises.exercises3}</p>

const App = () => {
  const course = 'Half Stack application development'
  const part = {
    part1: 'Fundamentals of React',
    part2: 'Using props to pass data',
    part3: 'State of a component'
  }
  const exercises = {
    exercises1: 10,
    exercises2: 7,
    exercises3: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part={part} exercises={exercises}  />
      <Total exercises={exercises}  />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))