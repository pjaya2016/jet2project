var merge = require('merge');
var EventEmitter = require('events').EventEmitter;
var axios = require('axios');
var Dispatcher = require('../dispatchers/mainDispatcher.js');
var getToken = require('../helpers/token.js');
var assign = require('object-assign');
var browserHistory = require('react-router').browserHistory;

var _getContarctor = null;

var _getTimesheet = null;

var _getIdTimesheet = null;
//////////////////////////////////////////////////////////////////////////////
var approvel = null;

var id = localStorage.getItem('id');

var UserStore = merge(EventEmitter.prototype, {
  getContractors(){
    return _getContarctor;
  },
  getTimeSheets(){
    return _getTimesheet;
  },
  getIdTimeSheets(){
    return _getIdTimesheet;
  },
  getTimesheetsApprovel(){
    return approvel;
  }
});
module.exports = UserStore;



Dispatcher.register(handleAction);
//TIMESHEETDATASEND
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
    case 'GETIDTIMESHEET'    :
      return getIdTimeSheet(payload);
      break;
    case 'TIMESHEETDATASEND'    :
      return updateTimeSheet(payload);
      break;
    case 'DELTIMESHEET'    :
      return deleteTimesheet(payload);
      break;
    case 'SENDFORAPPROVEL'    :
      return sendForApprovel(payload);
      break;
    case 'CHECKFORAPPROVEL'    :
      return getApprovel();
      break;
    case 'APPROVEDBYAPPROVER'    :
       return approverApproved();
      break;
    case 'DECLINEDBYAPPROVER'    :
      return approverDecline();
      break;
  }

}




function getApprovel(){

  axios({
    method : 'GET',
    url : '/api/getApproveltimesheets/' + id,
    headers : {
      'token': getToken()
    }
  })
  .then(function(response){
  approvel = response
  UserStore.emit("approvelTimesheet");
  });



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

function getIdTimeSheet(payload){
  axios({
      method : 'POST',
      url : '/api/getidtimesheet/' + id ,
      data: {
            TimeSheet : payload.data
            },
      headers : {
        'token': getToken()
      }
    })
  .then(function(response){
   _getIdTimesheet = response
   UserStore.emit("getIdTimeSheets");
  });
}

function updateTimeSheet(payload){
  axios({
      method : 'POST',
      url : '/api/updateTimesheet/' + id ,
      data: {
            datas : payload.data
            },
      headers : {
        'token': getToken()
      }
    })
  .then(function(response){
  //  _getIdTimesheet = response
  //  UserStore.emit("getIdTimeSheets");
  });
}

function deleteTimesheet(payload){

  axios({
      method : 'DELETE',
      url : '/api/deleteTimesheet/' + id ,
      data: {
            id : payload.data.id
            },
      headers : {
        'token': getToken()
      }
    })
  .then(function(response){
    console.log(response.data.message);
    if(response.data.message === "DELETED"){
      UserStore.emit("TIMESHEETDEL");
    }
  });
}

function sendForApprovel(payload){
  axios({
      method : 'POST',
      url : '/api/sendforapprovel/' + id ,
      data: {
            approvelContarctor : payload.data.data.contractor
            },
      headers : {
        'token': getToken()
      }
    })
  .then(function(response){
    console.log(response);
  });
}

function approverApproved(){

  // axios({
  //     method : 'POST',
  //     url : '/api/approverapproved/' + id ,
  //     headers : {
  //       'token': getToken()
  //     }
  //   })
  // .then(function(response){
  //   console.log(response);
  // });

  console.log('hhhh')


}

function approverDecline(){
    console.log('decline')
}
