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

const CountSeconds = (props) => {
  return <div>You didn't refresh this page {props.seconds} seconds :)</div>;
};

const Counter = (props) => {
  return <div>Result of clicking is {props.counter} now :)</div>;
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  const [seconds, countSeconds] = useState(0);
  const [counter, setCounter] = useState(0);
  setTimeout(() => countSeconds(seconds + 1), 1000);
  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);
  return (
    <div>
      <h1>Greetings!</h1>
      <Hello />
      <h1>Counter</h1>
      <CountSeconds seconds={seconds} />
      <div>
        <Counter counter={counter} />
        <Button onClick={increaseByOne} text="I am increase by one :)" />
        <Button onClick={decreaseByOne} text="I am decrease be one :)" />
        <Button onClick={setToZero} text="Reset! &gt;:(" />
      </div>
    </div>
  );
};

export default App;
