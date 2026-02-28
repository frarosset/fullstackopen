import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import NewPersonForm from "./components/NewPersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personServices from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);

  // newName, setNewName state moved to NewPersonForm: they are only used within it
  // the event handlers that are used only within a component have been moved in there
  // see ./components/NewPersonForm.jsx and ./components/SearchFilter.jsx

  const [search, setSearch] = useState("");

  useEffect(() => {
    personServices.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const getPersonWithName = (name) => {
    return persons.find((person) => person.name === name);
  };

  const setNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const addPerson = (newPerson) => {
    const existingPersonId = getPersonWithName(newPerson.name)?.id;

    if (existingPersonId != null) {
      const confirm = window.confirm(
        `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`,
      );

      if (confirm) {
        return personServices
          .update(existingPersonId, newPerson)
          .then((updatedPerson) => {
            setPersons((persons) =>
              persons.map((p) =>
                p.id === existingPersonId ? updatedPerson : p,
              ),
            );
            setNotification(`Updated ${newPerson.name}`);
          })
          .catch((e) => {
            if (e.status == 404) {
              alert(`${newPerson.name} was not found on the server`);
              setPersons(persons.filter((n) => n.id !== existingPersonId));
            } else {
              alert(
                `Sorry, an error occurred while deleting ${newPerson.name}`,
              );
            }
          });
      } else {
        // Treat this as if the promise has been resolved with no action
        return Promise.resolve(null);
      }
    }

    // Effectively create the new person.
    // Note: the backend might have updated data compared to the persons state on the backend.
    // Hence, you might try to add a new person which is not in the phonebook from the frontend
    // point of view, but it is from the backend side.
    // json-server used in this implementation for emulating a server does not check for duplicated data
    // (persons names in this case), so this is not caught.
    // In practice, you should also handle the errors retured by the backed in case of duplicated new entry.
    return personServices
      .create(newPerson)
      .then((createdPerson) => {
        setPersons((persons) => [...persons, createdPerson]);
        setNotification(`Added ${newPerson.name}`);
      })
      .catch(() => {
        alert(`Sorry, an error occurred while creating ${newPerson.name}`);
      });
  }; // returns a promise

  const removePerson = (person) =>
    personServices
      .remove(person.id)
      .then(() => {
        setPersons((persons) => persons.filter((p) => p.id !== person.id));
        setNotification(`Removed ${person.name}`);
      })
      .catch((e) => {
        if (e.status == 404) {
          alert(`${person.name} has already been deleted`);
          setPersons((persons) => persons.filter((p) => p.id !== person.id));
        } else {
          alert(`Sorry, an error occurred while deleting ${person.name}`);
        }
      });

  const personsToShow =
    search != ""
      ? persons.filter(
          (person) => person.name.toLowerCase().includes(search.toLowerCase()), // .includes() is case-sensitive
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} />

      <SearchFilter search={search} setSearch={setSearch} />

      <h3>add a new</h3>
      <NewPersonForm addPerson={addPerson} />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
