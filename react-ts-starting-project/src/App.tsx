import {useState} from 'react';
import Todos from './components/Todos';
import Todo from './models/todo';
import NewTodo from './components/NewTodo';

function App() {

  const [todos, setTodos] = useState<Todo[]>([]); // this state manages an array of Todo

  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);

    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };
 
  return (
    <>
    <Todos items={todos}/>
    <NewTodo onAddTodo={addTodoHandler}/>
    </>
  );
}

export default App;
