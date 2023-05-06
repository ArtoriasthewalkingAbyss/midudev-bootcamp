import './App.css'

const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ part }) => {
  return (
      <p>
        {part.name} {part.exercises}
      </p>
  )
}

const Content = ({ part }) => {
  return (
    <>
      {Object.values(part).map(value => {
        return (<Part key={value.name} part={ value }/>)
      })
      }
    </>
  )
}

const Total = ({ exercises }) => <p>Number of exercises {exercises.part1.exercises + exercises.part2.exercises + exercises.part3.exercises}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    part: {
      part1: {
        name: 'Fundamentals of React',
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
    <main>
      <Header course={course} />
      <Content part={course.part} />
      <Total exercises={course.part} />
    </main>
  )
}

export default App
