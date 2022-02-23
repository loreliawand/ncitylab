import { useState, useEffect } from 'react';
import Button from './components/Button';
import Counter from './components/Counter';
import CountSeconds from './components/CountSeconds';
import Hello from './components/Hello';
import History from './components/History';
import Note from './components/Note';
import noteService from './services/notes';

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

  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes));
  }, []);
  console.log('render', notes.length, 'notes');

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
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAllNotes
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <div>
        <h1>Greetings!</h1>
        <Hello />
      </div>

      <div>
        <h1>Seconds</h1>
        <CountSeconds seconds={seconds} />
      </div>

      <div>
        <h1>Counter</h1>
        <Counter counter={counter} />
        <Button handleClick={increaseByOne} text="I am increase by one :)" />
        <Button handleClick={decreaseByOne} text="I am decrease be one :)" />
        <Button handleClick={setToZero} text="Reset! &gt;:(" />
        <History allClicks={counterHistory} />
        <Button handleClick={clearClickingHistory} text="Clear history" />
      </div>

      <div>
        <h1>Left and right</h1>
        {left}
        <Button handleClick={handleLeftClick} text="I am a left button :)" />
        <Button handleClick={handleRightClick} text="I am a right button :)" />
        {right}
        <History allClicks={allClicks} />
        <Button handleClick={clearAllHistory} text="Clear history" />
      </div>

      <div>
        <h1>Notes</h1>
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
    </div>
  );
};

export default App;
