var redux = require('redux');

console.log('learning redux');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};
var reducer = (state = stateDefault, action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
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
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Ravi'
};
store.dispatch(action);

console.log('searchtext change',store.getState());
