import { useState } from "react";
import ControlledInput from "./ControlledInput";

const NewPersonForm = ({ persons, addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const newNameAlreadyExists = () => {
    return persons.some((person) => person.name === newName);
  };

  const onChangeNewNameHandle = (e) => {
    setNewName(e.target.value);
  };

  const onChangeNewNumberHandle = (e) => {
    setNewNumber(e.target.value);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();

    if (newNameAlreadyExists()) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = { name: newName.trim(), number: newNumber.trim() };

    addPerson(newPerson).then(() => {
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <form onSubmit={onSubmitHandle}>
      <div>
        name:
        <ControlledInput value={newName} onChange={onChangeNewNameHandle} />
      </div>
      <div>
        number:
        <ControlledInput value={newNumber} onChange={onChangeNewNumberHandle} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default NewPersonForm;
