var redux = require('redux');
var axios = require('axios');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();

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

// dispatching actions
store.dispatch(actions.fetchLocaton());
store.dispatch(actions.changeName('Ravi'));
store.dispatch(actions.addMovie('madmax','action'));
store.dispatch(actions.addHobby('drawing'));
store.dispatch(actions.addHobby('walking'));
store.dispatch(actions.removeHobby(1));
store.dispatch(actions.changeName('Kirthi'));
store.dispatch(actions.addMovie('matrix','sci-fi'));
store.dispatch(actions.removeMovie(2));


console.log('new state',store.getState());
