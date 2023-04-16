import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => <h1>{course.name}</h1>

const Part = ({part}) => {
  return (
      <p>
        {part.name} {part.exercises}
      </p>
  )
}

const Content = ({part}) => {

  return (
    <>
    <Part part={part.part1}/>
    <Part part={part.part2}/>
    <Part part={part.part3}/>
    </>
  )
}

const Total = ({exercises}) => <p>Number of exercises {exercises.part1.exercises + exercises.part2.exercises + exercises.part3.exercises}</p>
//encontratr una mejor forma de iterar por el objeto
const App = () => {
  const course = {
    name: 'Half Stack application development',
    part: {
      part1: {
        name:'Fundamentals of React',
        exercises: 10
      },
      part2: {
        name: 'Using props to pass data',
        exercises: 7
      }, 
      part3: {
        name: 'State of a component',
        exercises: 14
      }
    }
  }

  return (
    <div>
      <Header course={course} />
      <Content part={course.part} />
      <Total exercises={course.part}  />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))