import Button from "./Button";

const Person = ({ person, removePerson }) => {
  const handleDeleteClick = () => {
    const confirm = window.confirm(`Delete ${person.name} ?`);

    if (confirm) {
      removePerson(person);
    }
  };
  return (
    <p>
      {person.name} {person.number}{" "}
      <Button label="delete" onClick={handleDeleteClick} />
    </p>
  );
};

export default Person;
