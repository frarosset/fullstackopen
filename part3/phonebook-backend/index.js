const express = require("express");
const morgan = require("morgan");

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

app.use(express.json());

// "tiny" : :method :url :status :res[content-length] - :response-time ms
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

const tinyFormat = (tokens, req, res) =>
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");

const tinyBodyFormat = (tokens, req, res) =>
  `${tinyFormat(tokens, req, res)} ${tokens.body(req, res)}`;

app.use(
  // This prints the body for all requests
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),

  // This prints body only for POST requests
  morgan((tokens, req, res) => {
    if (req.method == "POST") {
      return tinyBodyFormat(tokens, req, res);
    } else {
      return tinyFormat(tokens, req, res);
    }
  }),
);

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

const generateId = () => Math.round(Math.random() * 1000000000);

app.post("/api/persons", (req, res) => {
  const data = req.body;

  if (!data.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }

  if (!data.number) {
    return res.status(400).json({
      error: "number missing",
    });
  }

  if (persons.find((p) => p.name == data.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: data.name,
    number: data.number,
  };

  persons = [...persons, person];

  res.json(person);
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
