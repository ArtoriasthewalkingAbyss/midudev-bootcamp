
const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const SectionStatisties = ({good, neutral, bad}) => {
    const all = good + neutral + bad;
    let average = (good + (bad * -1)) / all
    let positive = all ? (good * 100) / all : 0;

    return(
        <section>
            <h2>statistics</h2>
            { all > 0 ?
                <table>
                    <tbody>
                        <StatisticLine text='Good' value={good}/>
                        <StatisticLine text='Neutral' value={neutral}/>
                        <StatisticLine text='Bad' value={bad}/>
                        <StatisticLine text='All' value={all}/>
                        <StatisticLine text='Average' value={average}/>
                        <StatisticLine text='Positive' value={positive + '%'}/>
                    </tbody>
                </table> 
                :
                <p>No feedback give</p>
            }
        </section>
    )
}

export {SectionStatisties}