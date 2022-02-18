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
  const [counter, setCounter] = useState(0);
  setTimeout(() => setCounter(counter + 1), 1000);
  console.log('Rendering...', counter);
  return (
    <div>
      <h1>Greetings!</h1>
      <Hello />
      <h1>Counter</h1>
      <div>
        <p>You didn't refresh this page {counter} seconds :)</p>
      </div>
    </div>
  );
};

export default App;
