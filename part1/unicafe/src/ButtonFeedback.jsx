const Button = ({name, state, setState}) => {
    return (
        <button onClick={() => setState(state + 1)}>{name}</button>
    )
}

export {Button}