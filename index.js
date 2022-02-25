const http = require('http');
const express = require('express');
const app = express();

let notes = [
  {
    id: 1,
    content: "It's a sample",
    date: '2022-02-20T14:04:31.098Z',
    important: false,
  },
  {
    id: 2,
    content: "It's a sample too",
    date: '2022-02-20T14:05:46.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'Just a sample',
    date: '2022-02-23T14:06:55.298Z',
    important: false,
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hello world!</h1>');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id);
    return note.id === id;
  });
  console.log(note);
  response.json(note);
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
