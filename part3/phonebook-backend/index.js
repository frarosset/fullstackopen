const express = require("express");
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const person = persons.find((p) => p.id == id);

  if (!person) {
    return res.status(404).end();
  }

  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const initialSize = persons.length;

  persons = persons.filter((p) => p.id != id);

  if (initialSize == persons.length) {
    return res.status(404).end(); // Not Found
  }

  res.status(204).end(); // No Content
});

app.get("/info", (req, res) => {
  res.send(
    `
     <div>
       <p>Phonebook has info for ${persons.length} ${persons.length == 1 ? "person" : "people"} </p>
       <p>${new Date()}</p>
     </div>
    `,
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
