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

      <div>
        <Title text="statistics" level={2} />
        <FeedbackCount feedback="good" count={good} />
        <FeedbackCount feedback="neutral" count={neutral} />
        <FeedbackCount feedback="bad" count={bad} />
      </div>
    </div>
  );
};

export default App;
