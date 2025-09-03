import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json()); //?????????????

// Define custom body token for morgan
morgan.token('body', function (req, res) {
  return req.method === 'POST' ?
  JSON.stringify(req.body) : '';
});
// Use custom token in the logging format
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`)); // 'tiny' as a parameter


let phonebook = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

// Route for /api/persons
app.get('/api/persons', (req, res) => {
  res.json(phonebook);
});

// Route for /info
app.get('/info/', (req, res) => {
  const persons = phonebook.length;
  const currTime = new Date();
  const message =
    `<p>Phonebook has info for ${persons} people</p>
   <p>${currTime}</p>`;

  // Send the response
  res.send(message);
});

// Route for /api/persons/:id
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = phonebook.find(person => person.id === id);

  // response
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  };
});

// Route for deleting resources
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  phonebook = phonebook.filter(person => person.id !== id);

  // end the response
  res.status(204).end();
});

// Function to generate ID
const generateId = () => {
  const maxId = phonebook.length > 0 ?
    Math.max(...phonebook.map(n => Number(n.id))) : 0;
  return String(maxId + 1);
};

// Route for adding resources
app.post('/api/persons', (req, res) => {
  const body = req.body;
  const name = body.name;
  const number = body.number;

  // If the name or number is not provided
  if (!name || !number) {
    return res.status(400).json({
      error: 'missing'
    });
  };

  // Check for dublication
  const nameExists = phonebook.map(per => per.name).includes(name);
  // Response with duplication error
  if (nameExists) {
    return res.status(400).json({
      error: 'names must be unique'
    });
  };

  // new person to add
  const person = {
    name: name,
    number: number,
    id: generateId()
  }

  // update the phonebook
  phonebook = phonebook.concat(person);
  // response with new person
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});