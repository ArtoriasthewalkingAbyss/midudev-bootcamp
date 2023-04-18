
const SectionStatisties = ({good, neutral, bad}) => {
    return(
        <section>
            <h2>statisties</h2>
            <p>Good {good}</p>
            <p>Neutral {neutral}</p>
            <p>Bad {bad}</p>
        </section>
    )
}

export {SectionStatisties}