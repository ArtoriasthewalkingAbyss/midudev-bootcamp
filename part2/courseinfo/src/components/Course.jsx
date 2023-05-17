import { Header } from './Header.jsx'
import { Content } from './Content.jsx'
import { TotalExercises } from './TotalExercises.jsx'

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

export { Course }
