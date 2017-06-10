var redux = require('redux');

console.log('learning redux');

var stateDefault = {
  name: 'Anon',
  hobbies: [],
  movies: []
};

var nextHobbyId = 1;
var nextMovieId = 1;

var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  };
};

var hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
      ];
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => hobby.id !== action.id)
    default:
      return state;
  };
};

var moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
          {
            id: nextMovieId++,
            title: action.title,
            genre: action.genre
          }
      ];
    case 'REMOVE_MOVIE':
      return state.filter((movie) => movie.id !== action.id)
    default:
      return state;
  };
};

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

var currentState = store.getState();
console.log(currentState);


var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  console.log('Name is '+state.name);
  document.getElementById('app').innerHTML = state.name;

  console.log(store.getState());
});



store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Ravi'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'madmax',
  genre: 'action'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'drawing'
});

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'walking'
});

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'kirthi'
});

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'matrix',
  genre: 'sci-fi'
});

store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 2
});



console.log('name change',store.getState());
