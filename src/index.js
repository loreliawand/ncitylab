import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

let counter = 1;

const notes = [
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

axios.get('http://localhost:3001/notes').then((response) => {
  const notes = response.data;
  ReactDOM.render(
    <App counter={counter} notes={notes} />,
    document.getElementById('root')
  );
});
