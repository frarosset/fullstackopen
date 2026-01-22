import { useState } from "react";
import ControlledInput from "./ControlledInput";

const NewNameForm = ({ setPersons }) => {
  const [newName, setNewName] = useState("");

  const onChangeHandle = (e) => {
    setNewName(e.target.value);
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
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
