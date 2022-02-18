const Hello = ({ name, age }) => {
  name = 'Lora';
  age = 25;
  const bornYear = () => new Date().getFullYear() - age;
  return (
    <div>
      <p>
        Hello world, my name is {name}, I am {age} years old.
      </p>
      <p>So I was born in {bornYear()}.</p>
    </div>
  );
};

const App = () => {
  console.log('All systems are working normally');
  return (
    <div>
      <h1>Greetings!</h1>
      <Hello />
    </div>
  );
};

export default App;
