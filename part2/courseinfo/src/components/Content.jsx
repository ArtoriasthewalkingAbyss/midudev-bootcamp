import { Part } from './Part.jsx'

const Content = ({ part }) => {
  return (
    <>
        {part.map(value => (<Part key={value.id} part={ value }/>))}
    </>
  )
}

export { Content }
