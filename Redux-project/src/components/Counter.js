import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {counterActions} from '../store/index';

const Counter = () => {
  // useDispatch hook to dispatch action against our redux store
  const dispatch = useDispatch();

  // useSelector hook to get data (a slice of data) out of the store
  const counter = useSelector(state => state.counter);
  const showCounter = useSelector(state => state.showCounter);

  const incrementHandler = () => {
    // dispatch 'increment' identifier as defined in store
    dispatch({type: 'increment'}) 

    dispatch(counterActions.increment()); // using counterSlice from redux toolkit
  };

  const increaseHandler = () => {
    // amount is a payload
    // it could be coming from an input field (we don't necessarily need to hard code it)
    //dispatch({type: 'increase', amount: 10});

    // passing payload data to increase
    dispatch(counterActions.increase(10)); // { type: SOME_UNIQUE_IDENTIFIER, payload: 10 }
  };
  
  const decrementHandler = () => {
    // dispatch 'decrement' identifier as defined in store
    //dispatch({type: 'decrement'});  

    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch({type: 'toggle'});

    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter ? <div className={classes.value}>{counter}</div> : ''} {/* or showCounter && <div className={classes.value}>{counter}</div>  */}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;