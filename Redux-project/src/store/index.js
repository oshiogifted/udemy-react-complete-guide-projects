//import { createStore} from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';


const initialState = {counter: 0, showCounter: true};

// Reducer function #1
const counterSlice = createSlice({
  name: 'counter', // idenfier of the piece of state 'name' property is needed
  initialState: initialState, // initialState is a needed property
  reducers: { // a map of all the reducers this state slice needs
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase (state, action) {
      state.counter = state.counter + action.payload; //'payload' is the property that holds any extra data we dispatch
    },
    toggleCounter (state) {
      state.showCounter = !state.showCounter;
    }
  }
});


/* // Reducer function #2
const counterReducer = (state = initialState, action) => {

  if (action.type === 'increment') {
    //state.counter++; // don't do this...  objects are reference values (this is mutating the existing state)
    // instead, return NEW STATE OBJECT by overriding the existing state
    return {
      counter: state.counter + 1,
      // don't need this but redux won't merge our state changes so we have to be explicit about it
      showCounter: state.showCounter 
    }
  }

  if (action.type === 'increase') {
    return {
      // increase counter by a 'certain' amount (aka payload)
      counter: state.counter + action.amount,
      showCounter: state.showCounter
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter
    }
  }

  if (action.type === 'toggle') {
    return {
      counter: state.counter, // keep existing state
      showCounter: !state.showCounter // toggle counter
    };
  }

  return state;
}; */


// Store
//const store = createStore(counterReducer);
// configureStore is like createStore but it makes merging multiple reducers into one reducer reasier
const store = configureStore({
  // 'reducer' property is expected by configureStore
  // value for 'reducer' can be a single reducer or multiple reducers (that'll get merged into one)
  // reducer {counter: counterSlice.reducer, counter2: counterSlice2.reducer, etc... } a map of reducers
  reducer: counterSlice.reducer 
});

// to access the key names that match the method names in createSlice -
// action idenfiers will be created by redux toolkit
export const counterActions = counterSlice.actions;

// Export store to be used in index.js - wrap the entire app (or apps u want to have access to the store) with it (<Provider><some_app_to_have_access_to_store></Provider>)
export default store; 