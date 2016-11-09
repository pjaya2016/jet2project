var merge = require('merge');
var EventEmitter = require('events').EventEmitter;
var axios = require('axios');
var Dispatcher = require('../dispatchers/mainDispatcher.js');
var getToken = require('../helpers/token.js');
var assign = require('object-assign');
var browserHistory = require('react-router').browserHistory;

var _getContarctor = null;

var _getTimesheet = null;

var id = localStorage.getItem('id');

var UserStore = merge(EventEmitter.prototype, {
  getContractors(){
    return _getContarctor;
  },
  getTimeSheets(){
    return _getTimesheet;
  }
});
module.exports = UserStore;

Dispatcher.register(handleAction);

function handleAction(payload){
  switch(payload.action){
    case 'REGISTER' :
      return createContractor(payload);
      break;
    case 'LOGIN'    :
      return Login(payload);
      break;
    case 'GETCONTRACTOR'    :
      return getContractor();
      break;
    case 'ADDTIMESHEET'    :
      return addTimeSheet();
      break;
    case 'GETTIMESHEET'    :
      return getTimeSheet();
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
    startdate : payload.data.startdate,
    enddate : payload.data.enddate,
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
  axios.post('/api/login', {
    username : payload.data.username,
    password : payload.data.password
    })
    .then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.user._id);
      browserHistory.push('approverhome')
    })
    .catch(function (error) {
      UserStore.emit("wrongLoginDetails");
      console.log(error);
    });
}

function getContractor(){
  axios({
    method : 'GET',
    url : '/api/getContractor',
    headers : {
      'token': getToken()
    }
  })
  .then(function(response){
   _getContarctor = response
   UserStore.emit("getContractor");
  });
}

function addTimeSheet(payload){
  axios({
    method : 'POST',
    url : '/api/addTimesheet/' + id ,
    headers : {
      'token': getToken()
    }
  })
  .then(function(response){
  //  _getContarctor = response
  //  UserStore.emit("getContractor");
  console.log(response)
  });

}


function getTimeSheet(){
  axios({
      method : 'GET',
      url : '/api/addTimesheet/' + id ,
      headers : {
        'token': getToken()
      }
    })
  .then(function(response){
   _getTimesheet = response
   UserStore.emit("getTimeSheets");
  });

}
