import { useState } from 'react'

const StatisticsLine = ({ text, value }) => {
  return (
    <p>{text}: {value}</p>
  )
}

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <>
      {total && total > 0 ?
        <>
          <h2>Statistics</h2>
          <StatisticsLine text="Good:" value={good}/>
          <StatisticsLine text="Neutral:" value={neutral}/>
          <StatisticsLine text="Bad:" value={bad}/>
          <StatisticsLine text="Total:" value={total}/>
          <StatisticsLine text="Average:" value={average.toFixed(2)}/>
          <StatisticsLine text="Positive:" value={positive.toFixed(2)}/>
        </> :
        <h3>No feedback given</h3> }
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 0;
  const positive = total ? (good * 100) / total : 0;

  const handleButtonClick = (setter) => {
    setter(prev => prev + 1);
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <button onClick={() => handleButtonClick(setGood)}>Good</button>
      <button onClick={() => handleButtonClick(setNeutral)}>Neutral</button>
      <button onClick={() => handleButtonClick(setBad)}>Bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  );
}

export default App