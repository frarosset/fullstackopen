import { useState } from "react";
import NewPersonForm from "./components/NewPersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  // newName, setNewName state moved to NewPersonForm: they are only used within it

  return (
    <div>
      <h2>Phonebook</h2>
      <NewPersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
