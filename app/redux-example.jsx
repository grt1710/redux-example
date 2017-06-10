var redux = require('redux');

console.log('learning redux');

var reducer = (state = {name: 'anon'}, action) => {
  console.log(action);
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
      break;
    default:
      return state;
  }
};

var store = redux.createStore(reducer);
var currentState = store.getState();

console.log(currentState);

var action = {
  type: 'CHANGE_NAME',
  name: 'Ravi'
};
store.dispatch(action);

console.log('name change',store.getState());
