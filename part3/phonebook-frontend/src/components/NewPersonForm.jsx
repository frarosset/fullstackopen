import { useState } from "react";
import ControlledInput from "./ControlledInput";

const NewPersonForm = ({ addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onChangeNewNameHandle = (e) => {
    setNewName(e.target.value);
  };

  const onChangeNewNumberHandle = (e) => {
    setNewNumber(e.target.value);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();

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
        <ControlledInput
          value={newName}
          onChange={onChangeNewNameHandle}
          required={true}
        />
      </div>
      <div>
        number:
        <ControlledInput
          value={newNumber}
          onChange={onChangeNewNumberHandle}
          required={true}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default NewPersonForm;
