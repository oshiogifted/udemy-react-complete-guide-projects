import {useRef} from 'react'

// onAddTodo prop is a function type that takes a parameter text of type string and returns void
const NewTodo: React.FC<{onAddTodo: (text: string) => void}> = (props) => {
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // using ! instead of ? to signify that we know the connection would have been established
    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      // throw an error
      return;
    }

    props.onAddTodo(enteredText);
  }


  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='text'>Todo text</label>
      <input type='text' id='text' ref={todoTextInputRef}/>
      <button>Add Todo</button>
    </form>
  );

};

export default NewTodo;