import Person from "./Person.jsx";

const Persons = ({ persons }) => (
  <ul>
    {persons.map((person) => (
      <li key={person.name}>
        <Person person={person} />
      </li>
    ))}
  </ul>
);

export default Persons;
