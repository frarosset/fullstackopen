import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import NewPersonForm from "./components/NewPersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  // newName, setNewName state moved to NewPersonForm: they are only used within it
  // the event handlers that are used only within a component have been moved in there
  // see ./components/NewPersonForm.jsx and ./components/SearchFilter.jsx

  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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

      <h3>add a new</h3>
      <NewPersonForm persons={persons} setPersons={setPersons} />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
