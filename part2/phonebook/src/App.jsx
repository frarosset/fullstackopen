import { useState } from "react";
import SearchFilter from "./components/SearchFilter";
import NewPersonForm from "./components/NewPersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  // newName, setNewName state moved to NewPersonForm: they are only used within it

  const [search, setSearch] = useState("");

  const personsToShow =
    search != ""
      ? persons.filter(
          (person) => person.name.toLowerCase().includes(search.toLowerCase()), // .includes() is case-sensitive
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter search={search} setSearch={setSearch} />
      <h2>add a new</h2>
      <NewPersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
