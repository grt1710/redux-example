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

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  console.log('Name is '+state.name);
  document.getElementById('app').innerHTML = state.name;
});



var currentState = store.getState();
console.log(currentState);

var action = {
  type: 'CHANGE_NAME',
  name: 'Ravi'
};
store.dispatch(action);

var action2 = {
  type: 'CHANGE_NAME',
  name: 'kirthi'
}

store.dispatch(action2);


console.log('name change',store.getState());
