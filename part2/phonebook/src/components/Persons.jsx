import Person from "./Person.jsx";

const Persons = ({ persons }) =>
  persons.length ? (
    <ul>
      {" "}
      {persons.map((person) => (
        <li key={person.name}>
          <Person person={person} />
        </li>
      ))}{" "}
    </ul>
  ) : (
    "No results"
  );

export default Persons;
