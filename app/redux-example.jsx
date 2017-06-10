var redux = require('redux');
var axios = require('axios');

// Name Reducer & action generators
// -----------------
var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  };
};

var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name: name
  };
};

// Hobbies Reducer & action generators
// -----------------
var nextHobbyId = 1;
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

var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby // (ES6 syntax) same as hobby: hobby
  };
};

var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  };
};

// Movies Reducer & action generators
// -----------------
var nextMovieId = 1;
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

var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  };
};

var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  };
};


// Map Reducer & action generators
// -----------------
var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined
      };
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      };
    default:
      return state;
  }
};

var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  };
};

var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url: url
  };
};

var fetchLocaton = () => {
  store.dispatch(startLocationFetch());
  axios.get('http://ip-api.com/json').then(function (res) {
    var lat = res.data.lat;
    var lon = res.data.lon;
    var baseUrl = 'http://maps.google.com/?q=';

    store.dispatch(completeLocationFetch(baseUrl+lat+','+lon));
  })
};

// Combining Reducers
// -----------------
var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
});


// Creating Store
// -----------------
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

var currentState = store.getState();
console.log(currentState);


var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  console.log(store.getState());

  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = "<a href=" + state.map.url + " target='_blank'>View your Location</a>";
  }
});


fetchLocaton();


// dispatching actions
store.dispatch(changeName('Ravi'));
store.dispatch(addMovie('madmax','action'));
store.dispatch(addHobby('drawing'));
store.dispatch(addHobby('walking'));
store.dispatch(removeHobby(1));
store.dispatch(changeName('Kirthi'));
store.dispatch(addMovie('matrix','sci-fi'));
store.dispatch(removeMovie(2));


console.log('new state',store.getState());
