import Counter from './components/Counter';
import {useEffect, useState, useRef} from 'react';


function App() {
  const [name, setName] = useState("Kyle");
  const previousName = useRef(null);

  useEffect(() => {
    previousName.current = name;
    console.log("this is useEffect previousName - " + previousName.current);
  }, [name]);

  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      <div>
        My name is {name}, but it used to be {previousName.current}
        {console.log("this is previousName.current in return - " + previousName.current)}
        {console.log("this is name in return - " + name)}
      </div>
      <Counter />
    </>
  );
}

export default App;
