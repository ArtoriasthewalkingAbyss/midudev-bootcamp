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
      {part.map(value => (<Part key={value.id} part={ value }/>))}
    </>
  )
}

const TotalExercises = ({ part }) => {
  const total = part.reduce((acc, item) => {
    return (acc += item.exercises)
  }, 0)
  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

const Course = ({ course }) => {
  if (!course) {
    return <p>No hay cursos</p>
  }
  return (
    <section>
      <Header course={course} />
      <Content part={course.parts} />
      <TotalExercises part={course.parts}/>
    </section>
  )
}

const App = () => {
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <main>
    {course.map(value => <Course key={value.id} course={value} />)}
  </main>
}

export default App
