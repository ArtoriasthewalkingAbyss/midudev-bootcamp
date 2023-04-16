import { Button } from "./ButtonFeedback"


const SectionFeedback = ({good, neutral, bad}) => {
    const stateGood = good.good;
    const setStateGood = good.setGood;
    const stateNeutral = neutral.neutral;
    const setStateNeutral = neutral.setNeutral;
    const stateBad = bad.bad;
    const setStateBad = bad.setBad;
    
    return (
        <section>
            <h2>Give Feedback</h2>
            <Button name={"Good"} state={stateGood} setState={setStateGood}/>
            <Button name={"Neutral"} state={stateNeutral} setState={setStateNeutral}/>
            <Button name={"Bad"} state={stateBad} setState={setStateBad}/>
        </section>
    )
}

export {SectionFeedback}