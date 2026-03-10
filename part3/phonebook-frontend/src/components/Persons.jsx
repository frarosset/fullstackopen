import Person from "./Person.jsx";

const Persons = ({ persons, removePerson }) =>
  persons.length ? (
    <ul>
      {" "}
      {persons.map((person) => (
        <li key={person.id}>
          <Person person={person} removePerson={removePerson} />
        </li>
      ))}{" "}
    </ul>
  ) : (
    "No results"
  );

export default Persons;
