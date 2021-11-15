import React from 'react';
import Todo from '../models/todo';
import TodoItem from './TodoItem';

// FC - functional Component
// <{items: Todo[]} - the props of this component, including the default react props (like props.children, props.ref etc.)
const Todos: React.FC<{items: Todo[]}> =  (props) =>  {
  return (
    <ul>
      {props.items.map((item) => (
        <TodoItem key={item.id} text={item.text}/>
      ))}
    </ul>
  );
}

export default Todos;