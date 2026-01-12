import { useState } from "react";

const Title = ({ text, level }) => {
  if (level == 1) return <h1>{text}</h1>;
  else if (level == 2) return <h2>{text}</h2>;
  else return <h3>{text}</h3>;
};
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const giveFeedback = (setFeedback) => () => setFeedback((val) => val + 1);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  const titleComponent = <Title text="statistics" level={2} />;

  if (all == 0) {
    return (
      <div>
        {titleComponent}
        <div>No feedback given</div>
      </div>
    );
  }

  const average = (good - bad) / all; // = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      {titleComponent}
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />

          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive} %`} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title text="give feedback" level={1} />

      <div>
        <Button text="good" onClick={giveFeedback(setGood)} />
        <Button text="neutral" onClick={giveFeedback(setNeutral)} />
        <Button text="bad" onClick={giveFeedback(setBad)} />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
