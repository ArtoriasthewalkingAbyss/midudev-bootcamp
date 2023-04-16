
const SectionStatisties = ({good, neutral, bad}) => {
    const all = good + neutral + bad;
    let average = (good + bad *-1) / 3
    let positive = good ? (good * 100) / all : 0;
    
    return(
        <section>
            <h2>statisties</h2>
            <p>Good {good}</p>
            <p>Neutral {neutral}</p>
            <p>Bad {bad}</p>
            <p>all {all}</p>
            <p>average {average}</p>
            <p>positive {positive} %</p>
        </section>
    )
}

export {SectionStatisties}