import { useState } from 'react';

const Hello = ({ name, age }) => {
  console.log('All systems are working normally');
  name = 'Lora';
  age = 26;
  const bornYear = () => new Date().getFullYear() - age;
  return (
    <div>
      <p>
        Hello world, my name is {name}, I am {age} years old.
      </p>
      <p>So I was born in {bornYear()}.</p>
      <p>This is my website :)</p>
    </div>
  );
};

const App = () => {
  const [seconds, countSeconds] = useState(0);
  const [counter, setCounter] = useState(0);
  setTimeout(() => countSeconds(seconds + 1), 1000);
  return (
    <div>
      <h1>Greetings!</h1>
      <Hello />
      <h1>Counter</h1>
      <div>
        <p>You didn't refresh this page {seconds} seconds :)</p>
      </div>
      <div>
        <p>You clicked on a beautiful button {counter} times :)</p>
        <button onClick={() => setCounter(counter + 1)}>
          I am a beautiful button :)
        </button>
        <button onClick={() => setCounter(0)}>Reset! &gt;:(</button>
      </div>
    </div>
  );
};

export default App;
