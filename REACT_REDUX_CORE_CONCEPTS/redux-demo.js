/* 
To run this file, type - node redux-demo.js - outputs in cmd line
Using node to run this JS file outside the browser
Commands used: 
npm init - y (to initialize a dependency package)
npm install redux (to install redux)
node redux-demo.js (to run this file)
*/

const redux = require('redux'); // import redux (node module style)


// reducer function (input: current state, action)---
// reducer (and subscriber) are executed by the redux library
// state needs a default value otherwise when store is initialized and counterReducer is executed
// the code will fail (otherwise it'll be undefined)
// for the first time it runs it, it has a value, if it runs thereafter and we have an existing state
// the default value will not be used. Default value only gets used when the reducer function gets called for the first time
const counterReducer = (state = {counter: 0}, action) => {
  if (action.type === 'increment') {
    // return new state which replaces initial (or existing) state
    // return an object because state is more than one single value, but it can be any kind - just a number or a string
    return {
      counter: state.counter + 1 // old counter in state gets updated with + 1 which outputs => new state to the store
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1 // old counter in state gets updated with - 1 which outputs => new state to the store
    };
  }

  // otherwise, if a different action, like the default initial action was dispatched 
  // ...we want to return the unchanged state
  return state;

};


// store---
// store needs to know which reducer is responsible for changing the store
const store = redux.createStore(counterReducer);

//console.log(store.getState()); // initial state (after store is created and reducer is executed)

// component---
// subscribe to the store
// subscriber is executed by redux library
const counterSubscriber = () => {
  // getState is a method available on the store created with createStore()
  // getState gives us the latest (new) state snapshot after it was updated
  const latestState = store.getState();
  console.log(latestState);
};

// subscription---
// make redux aware of the subscriber function (counterSubscriber)
// ...and tell it that counterSubscriber should be executed whenever our state changes
// subscribe method wants a function which redux executes for us whenever the data in the store changes
store.subscribe(counterSubscriber);


// action---
// dispatch, dispatches an action
// action is a JS object with type property that acts as an identifier
// use a unique string so that every distinct action you distpatch (via that string) leads to different things been done in the reducer function
store.dispatch({type: 'increment'}); // increase counter by 1 
store.dispatch({type: 'decrement'}); // decrease counter by 1 