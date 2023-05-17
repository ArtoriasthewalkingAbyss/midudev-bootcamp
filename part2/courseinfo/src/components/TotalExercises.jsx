const TotalExercises = ({ part }) => {
  const total = part.reduce((acc, item) => {
    return (acc += item.exercises)
  }, 0)
  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

export { TotalExercises }
