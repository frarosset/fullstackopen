import { useState } from "react";

const Title = ({ text, level }) => {
  if (level == 1) return <h1>{text}</h1>;
  else if (level == 2) return <h2>{text}</h2>;
  else return <h3>{text}</h3>;
};
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const giveFeedback = (setFeedback) => () => setFeedback((val) => val + 1);

const FeedbackCount = ({ feedback, count }) => (
  <div>
    {feedback} {count}
  </div>
);

const FeedbackStat = ({ stat, value }) => (
  <div>
    {stat} {value}
  </div>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good - bad) / all; // = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      <Title text="give feedback" level={1} />

      <div>
        <Button text="good" onClick={giveFeedback(setGood)} />
        <Button text="neutral" onClick={giveFeedback(setNeutral)} />
        <Button text="bad" onClick={giveFeedback(setBad)} />
      </div>

      <div>
        <Title text="statistics" level={2} />
        <FeedbackCount feedback="good" count={good} />
        <FeedbackCount feedback="neutral" count={neutral} />
        <FeedbackCount feedback="bad" count={bad} />

        <FeedbackStat stat="all" value={all} />
        <FeedbackStat stat="average" value={average} />
        <FeedbackStat stat="positive" value={`${positive} %`} />
      </div>
    </div>
  );
};

export default App;
