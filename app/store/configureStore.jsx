var redux = require('redux');
var thunk = require('redux-thunk').default;

var {nameReducer, hobbiesReducer, moviesReducer, mapReducer} = require('app/reducers/index.jsx');

export var configure = () => {
  var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer,
    map: mapReducer
  });

  // Creating Store
  // -----------------
  var store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
