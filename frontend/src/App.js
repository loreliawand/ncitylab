import { useState, useEffect } from 'react';
import './index.css';
import Button from './components/Button';
import Counter from './components/Counter';
import CountSeconds from './components/CountSeconds';
import Footer from './components/Footer';
import Hello from './components/Hello';
import History from './components/History';
import Note from './components/Note';
import Notifications from './components/Notifications';
import noteService from './services/notes';
import axios from 'axios';
import loginService from './services/login';

const App = () => {
  console.log('All systems are working normally');

  const [seconds, countSeconds] = useState(0);
  const [counter, setCounter] = useState(0);
  const [counterHistory, setCounterHistory] = useState([]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAllNotes, setShowAllNotes] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://ncitylab.com/api/notes').then((res) => {
      setNotes(res.data);
    });
  }, []);

  setTimeout(() => countSeconds(seconds + 1), 1000);

  const increaseByOne = () => {
    setCounterHistory(counterHistory.concat('+ 1'));
    setCounter(counter + 1);
  };
  const decreaseByOne = () => {
    setCounterHistory(counterHistory.concat('- 1'));
    setCounter(counter - 1);
  };
  const setToZero = () => {
    setCounterHistory(counterHistory.concat('0'));
    setCounter(0);
  };

  const clearClickingHistory = () => {
    setCounterHistory([]);
  };

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
  };
  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
  };

  const clearAllHistory = () => {
    setAll([]);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  );

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changeNote = { ...note, important: !note.important };

    noteService
      .update(id, changeNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const notesToShow = showAllNotes
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <div className="center">
        <Hello />

        {user === null ? (
          loginForm()
        ) : (
          <div>
            <p>{user.name} logged-in</p>
            {noteForm()}
          </div>
        )}
      </div>

      <div className="right lightgreen">
        <h1>Counter</h1>
        <Counter counter={counter} />
        <Button handleClick={increaseByOne} text="I am increase by one :)" />
        <Button handleClick={decreaseByOne} text="I am decrease be one :)" />
        <Button handleClick={setToZero} text="Reset! &gt;:(" />
        <History allClicks={counterHistory} />
        <Button handleClick={clearClickingHistory} text="Clear history" />
      </div>

      <div className="center">
        <h1>Left and right</h1>
        {left}
        <Button handleClick={handleLeftClick} text="I am a left button :)" />
        <Button handleClick={handleRightClick} text="I am a right button :)" />
        {right}
        <History allClicks={allClicks} />
        <Button handleClick={clearAllHistory} text="Clear history" />
      </div>

      <div className="lightgreen">
        <h1>Notes</h1>
        <Notifications message={errorMessage} />
        <div>
          <button onClick={() => setShowAllNotes(!showAllNotes)}>
            show {showAllNotes ? 'important' : 'all'}
          </button>
        </div>
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => {
                toggleImportanceOf(note.id);
              }}
            />
          ))}
        </ul>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange} />
          <button type="submit">save</button>
        </form>
      </div>

      <div>
        <CountSeconds seconds={seconds} />
      </div>

      <div className="right">
        <Footer />
      </div>
    </div>
  );
};

export default App;
