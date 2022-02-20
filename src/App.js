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

const CountSeconds = ({ seconds }) => (
  <div>You didn't refresh this page {seconds} seconds :)</div>
);

const Counter = ({ counter }) => (
  <div>Result of clicking is {counter} now :)</div>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>The app is used by pressing the buttons</div>;
  }
  return <div>Button press history: {props.allClicks.join(' ')}</div>;
};

const App = (props) => {
  const [seconds, countSeconds] = useState(0);
  const [counter, setCounter] = useState(0);
  const [counterHistory, setCounterHistory] = useState([]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

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

  const { notes } = props;

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
        <ul>
          {notes.map((note) => (
            <li>{note.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
