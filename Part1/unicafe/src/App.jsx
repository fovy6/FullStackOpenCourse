import { useState } from 'react'

const Button = ({handler, what}) => {
  return (
    <button onClick={handler}>{what}</button>
  )
}

const Display = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / all
  const positive = (good / all) * 100 + ' %'

  return (
    <div>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={() => setGood(good + 1)} what='good'/>
      <Button handler={() => setNeutral(neutral + 1)} what='neutral'/>
      <Button handler={() => setBad(bad + 1)} what='bad'/>
      <h1>statistics</h1>
      <Display text='good' value={good}/>
      <Display text='neutral' value={neutral}/>
      <Display text='bad' value={bad}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App