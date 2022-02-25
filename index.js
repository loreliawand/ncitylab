const http = require('http');

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

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end(JSON.stringify(notes));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
