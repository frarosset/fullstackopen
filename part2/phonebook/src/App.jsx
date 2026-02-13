import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import NewPersonForm from "./components/NewPersonForm";
import Persons from "./components/Persons";
import personServices from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);

  // newName, setNewName state moved to NewPersonForm: they are only used within it
  // the event handlers that are used only within a component have been moved in there
  // see ./components/NewPersonForm.jsx and ./components/SearchFilter.jsx

  const [search, setSearch] = useState("");

  useEffect(() => {
    personServices.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const addPerson = (newPerson) =>
    personServices.create(newPerson).then((createdPerson) => {
      setPersons((persons) => [...persons, createdPerson]);
    }); // returns a promise

  const removePerson = (person) =>
    personServices
      .remove(person.id)
      .catch((e) => {
        const errorMessage =
          e.status == 404
            ? `${person.name} has already been deleted`
            : `Sorry, an error occurred while deleting ${person.name}`;
        alert(errorMessage);
      })
      .finally(() => {
        setPersons((persons) => persons.filter((p) => p.id !== person.id));
      }); // returns a promise

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
      <NewPersonForm persons={persons} addPerson={addPerson} />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
