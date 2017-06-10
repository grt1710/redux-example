var axios = require('axios');

export var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name: name
  };
};

export var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby // (ES6 syntax) same as hobby: hobby
  };
};

export var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  };
};

export var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  };
};

export var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  };
};

export var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  };
};

export var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url: url
  };
};


export var fetchLocaton = () => {
  return (dispatch, getState) => {
    dispatch(startLocationFetch());
    axios.get('http://ip-api.com/json').then(function (res) {
      var lat = res.data.lat;
      var lon = res.data.lon;
      var baseUrl = 'http://maps.google.com/?q=';

      dispatch(completeLocationFetch(baseUrl+lat+','+lon));
    });
  };
};
