import { useState } from "react";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

function getRandomInteger(max) {
  return Math.floor(Math.random() * (max + 1));
}

function getRandomAnecdoteIdx() {
  return getRandomInteger(anecdotes.length - 1);
}

function initVotes() {
  return Array(anecdotes.length).fill(0);
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const AnecdoteVote = ({ selected, votes }) => (
  <p>has {votes[selected]} votes</p>
);

const Anecdote = ({ selected, votes }) => (
  <div>
    <p>{anecdotes[selected]}</p>
    <AnecdoteVote selected={selected} votes={votes} />
  </div>
);

const MostVotedAnecdote = ({ votes }) => {
  const maxVotes = Math.max(...votes);

  if (maxVotes === 0)
    return (
      <div>
        <p>There are no voted anecdotes yet</p>
      </div>
    );

  const mostVoted = votes.indexOf(maxVotes);

  return <Anecdote selected={mostVoted} votes={votes} />;
};

const App = () => {
  // Initialize with random anecdote: pass a function to useState hook
  // to avoid executing the intialization function at each re-render
  const [selected, setSelected] = useState(() => getRandomAnecdoteIdx());
  const [votes, setVotes] = useState(() => initVotes());

  const updateSelected = () => {
    let newSelected = getRandomAnecdoteIdx();

    // try again if you get the same anecdote
    while (newSelected === selected && anecdotes.length > 1) {
      newSelected = getRandomAnecdoteIdx();
    }

    setSelected(newSelected);
  };

  const vote = () => {
    const copiedVotes = [...votes];
    copiedVotes[selected]++;
    setVotes(copiedVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote selected={selected} votes={votes} />

      <div>
        <Button onClick={vote} text="vote" />
        <Button onClick={updateSelected} text="next anecdote" />
      </div>

      <h2>Anecdote with most votes</h2>
      <MostVotedAnecdote votes={votes} />
    </div>
  );
};

export default App;
