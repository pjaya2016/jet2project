var merge           = require('merge');
var EventEmitter    = require('events').EventEmitter;
var axios           = require('axios');
var Dispatcher      = require('../dispatchers/mainDispatcher.js');
var getToken        = require('../helpers/token.js');
var assign          = require('object-assign');
var browserHistory  = require('react-router').browserHistory;

var _getContarctor  = null;

var _getTimesheet   = null;

var _getIdTimesheet = null;

var approvel        = null;

var  _invoice       = null;

var _getComment     = null;

var _search         = null;

var _invoiceSearch  = null;

var id              = localStorage.getItem('id');
/**********************************************************************/
/************************        UserStore     ************************/
/**********************************************************************/
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
  },
  getComment(){
    return _getComment;
  },
  getSearchResult(){
    return _search;
  },
  getInvoice(){
    return _invoice;
  }
});
module.exports = UserStore;
/**********************************************************************/
/************************       Dispatcher     ************************/
/**********************************************************************/
Dispatcher.register(handleAction);

function handleAction(payload){
  switch(payload.action){
    case 'REGISTER':
    return createContractor(payload);
    break;
    case 'LOGIN':
    return Login(payload);
    break;
    case 'GETCONTRACTOR':
    return getContractor();
    break;
    case 'ADDTIMESHEET':
    return addTimeSheet();
    break;
    case 'GETTIMESHEET':
    return getTimeSheet();
    break;
    case 'GETIDTIMESHEET':
    return getIdTimeSheet(payload);
    break;
    case 'TIMESHEETDATASEND':
    return updateTimeSheet(payload);
    break;
    case 'DELTIMESHEET':
    return deleteTimesheet(payload);
    break;
    case 'SENDFORAPPROVEL':
    return sendForApprovel(payload);
    break;
    case 'CHECKFORAPPROVEL':
    return getApprovel(payload);
    break;
    case 'APPROVEDBYAPPROVER':
    return approverApproved(payload);
    break;
    case 'DECLINEDBYAPPROVER':
    return approverDecline(payload);
    break;
    case 'GETCOMMENT':
    return getComment();
    break;
    case 'SEARCH':
    return search(payload);
    break;
    case 'INVOICE':
    return invoice(payload);
    break;
    case 'PAID':
    return paid(payload);
    break;
    case 'SEARCHINVOICE':
    return InvoiceSearchAdmin(payload.search);
    break;
  }
}
/**********************************************************************/
/************************       FUNCTIONS      ************************/
/**********************************************************************/
function getApprovel(paylaod){
  axios({
    method : 'GET',
    url : '/api/getApproveltimesheets/' + paylaod.contractorId,
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
    comments : '',
    type: payload.data.type
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
    localStorage.setItem("type" , response.data.user.type);
    localStorage.setItem("id"   , response.data.user._id);
    browserHistory.push('/approverHome')
    location.reload()
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
    console.log(response)
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

function approverApproved(payload){
  axios({
    method : 'POST',
    url : '/api/approverapproved/' + payload.userId ,
    headers : {
      'token': getToken()
    }
  })
  .then(function(response){
    console.log(response);
  });

}

function approverDecline(payload){
  axios({
    method : 'POST',
    url : '/api/approverdeclined/' + payload.userId ,
    data: {
      comment : payload.comment
    },
    headers : {
      'token': getToken()
    }
  })
  .then(function(response){
    console.log(response);
  });
}

function getComment(){
  axios({
    method : 'GET',
    url : '/api/getcomment/' + id ,
    headers : {
      'token': getToken()
    }
  })
  .then(function(response){
    _getComment = response
    UserStore.emit("getcomment");
  });
}

function search(payload){
  axios({
    method : 'POST',
    url : '/api/search/' + id ,
    data : {
      search : payload.searchInfo
    },
    headers : {
      'token': getToken()
    }
  })
  .then(function(response){
    _search = response
    UserStore.emit("search");
  });
}

function invoice(payload){
  axios({
    method : 'POST',
    url : '/api/paid/' + payload.id.userId ,
    headers : {
      'token': getToken()
    }
  })
  .then(function(response){
    _invoice = response
    UserStore.emit("invoice");
  });
}

function paid(payload){
  axios({
    method : 'POST',
    url : '/api/changePaid/' + payload.id.userId ,
    headers : {
      'token': getToken()
    }
  })
  .then(function(response){
    console.log(response)
  });
}

function InvoiceSearchAdmin(payload){
  axios({
    method : 'POST',
    url : '/api/invoicesearch',
    data :{
      searchInvoice : payload
    },
    headers : {
      'token': getToken()
    }
  })
  .then(function(response){
    UserStore.emit('invoiceSearch',response)
  });
}
