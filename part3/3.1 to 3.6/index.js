import express from 'express';

const app = express();

const phonebook = [
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});