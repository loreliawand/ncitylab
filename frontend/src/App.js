import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
// import {useState, useEffect, useRef} from 'react';
// import LoginForm from './components/LoginForm';
// import Note from './components/Note';
// import NoteForm from './components/NoteForm';
// import Notifications from './components/Notifications';
// import Togglable from './components/Togglable';
// import noteService from './services/notes';
// import axios from 'axios';
// import loginService from './services/login';

const App = () => {
  const padding = { padding: 5 };
  // const [seconds, countSeconds] = useState(0);
  // const [notes, setNotes] = useState([]);
  // const [showAllNotes, setShowAllNotes] = useState(true);
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   axios.get('http://ncitylab.com/api/notes').then((res) => {
  //     setNotes(res.data);
  //     console.log('All systems are working normally');
  //   });
  // }, []);

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedUser');
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     setUser(user);
  //     noteService.setToken(user.token);
  //   }
  // }, []);

  // setTimeout(() => countSeconds(seconds + 1), 1000);

  // const addNote = (noteObject) => {
  //   noteFormRef.current.toggleVisibility();
  //   noteService.create(noteObject).then((returnedNote) => {
  //     setNotes(notes.concat(returnedNote));
  //   });
  // };

  // const noteFormRef = useRef();

  // const toggleImportanceOf = (id) => {
  //   const note = notes.find((n) => n.id === id);
  //   const changeNote = { ...note, important: !note.important };

  // noteService
  //   .update(id, changeNote)
  //   .then((returnedNote) => {
  //     setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
  //   })
  //   .catch((error) => {
  //     setErrorMessage(
  //       `Note '${note.content}' was already removed from server`
  //     );
  //     setTimeout(() => {
  //       setErrorMessage(null);
  //     }, 5000);
  //     setNotes(notes.filter((n) => n.id !== id));
  //   });

  // const handleLogin = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const user = await loginService.login({
  //       username,
  //       password,
  //     });

  //     window.localStorage.setItem('loggedUser', JSON.stringify(user));
  //     noteService.setToken(user.token);
  //     setUser(user);
  //     setUsername('');
  //     setPassword('');
  //   } catch (exception) {
  //     setErrorMessage('Wrong credentials');
  //     setTimeout(() => {
  //       setErrorMessage(null);
  //     }, 5000);
  //   }
  // };

  // const notesToShow = showAllNotes
  //   ? notes
  //   : notes.filter((note) => note.important === true);

  return (
    <div className="wrapper">
      <Router>
        <div>
          <Link style={padding} to="/">
            Dashboard
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route />
          <Route />
        </Routes>
        <div>
          {/* {user === null ? (
          <Togglable buttonLabel="Login">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        ) : (
          <div>
            <p>{user.username} logged-in</p>
            <Togglable buttonLabel="New note">
              <NoteForm createNote={addNote} />
            </Togglable>
          </div>
        )} */}

          {/* <div>
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
      </div> */}
        </div>
        <div className="footer">
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
