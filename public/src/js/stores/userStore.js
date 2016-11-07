var merge = require('merge');
var EventEmitter = require('events').EventEmitter;
var axios = require('axios');
var Dispatcher = require('../dispatchers/mainDispatcher.js');
// var getToken = require('../helpers/token.js');
var assign = require('object-assign');
var browserHistory = require('react-router').browserHistory;


var UserStore = merge(EventEmitter.prototype, {

});
module.exports = UserStore;

Dispatcher.register(handleAction);

function handleAction(payload){
  switch(payload.action){
    case 'REGISTER' :
    return createContractor(payload);
    break;
  }
}

function createContractor(payload){
  axios.post('/api/register', {
    firstName : payload.data.firstName,
    lastName : payload.data.lastName,
    username : payload.data.username,
    password : payload.data.passwordHash,
    passwordConfirmation : payload.data.passwordConfirmation,
    email : payload.data.email,
    type: payload.data.type,
    })
    .then(function (response) {
      console.log(response);
      UserStore.emit('contractorCreated');
    })
    .catch(function (error) {
      console.log(error);
    });
}

function Login(payload){

}
