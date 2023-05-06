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
      {part.map(value => {
        return (<Part key={value.id} part={ value }/>)
      })
      }
    </>
  )
}

const Course = ({ course }) => {
  if (!course) {
    return <p>No hay cursos</p>
  }
  return (
    <main>
      <Header course={course} />
      <Content part={course.parts} />
    </main>
  )
}

const App = () => {
  const course = {
    id: 0,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
