import { useState } from "react";
import NewNameForm from "./components/NewNameForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  // newName, setNewName state moved to NewNameForm: they are only used within it

  return (
    <div>
      <h2>Phonebook</h2>
      <NewNameForm setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
