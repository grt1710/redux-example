var redux = require('redux');

console.log('learning redux');

var reducer = (state = {name: 'anon'}, action) => {
  return state;
}

var store = redux.createStore(reducer);
var currentState = store.getState();

console.log(currentState);
