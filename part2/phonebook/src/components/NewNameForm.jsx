import { useState } from "react";
import ControlledInput from "./ControlledInput";

const NewNameForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");

  const newNameAlreadyExists = () => {
    return persons.some((person) => person.name === newName);
  };

  const onChangeHandle = (e) => {
    setNewName(e.target.value);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();

    if (newNameAlreadyExists()) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    setPersons((persons) => [...persons, { name: newName }]);
    setNewName("");
  };

  return (
    <form onSubmit={onSubmitHandle}>
      <div>
        name: <ControlledInput value={newName} onChange={onChangeHandle} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default NewNameForm;
