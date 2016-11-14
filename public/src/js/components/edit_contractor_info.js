var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var userStore      = require("../stores/userStore.js");

var type  = localStorage.getItem('type');


var EditContractorInfo = React.createClass({
  getInitialState(){
    return{
      firstName : '',
      lastName  : '',
      username  : '',
      Email     : ''
    }
  },
  componentWillMount: function() {
    var self = this;

    Dispatcher.dispatch({
      action : 'GETCONTRACTORID',
      id : this.props.params.id
    });

    userStore.on('getcontractorid',function(payload){
      console.log(payload.data.contractor[0].firstName)
      self.setState({
        firstName : payload.data.contractor[0].firstName,
        lastName  : payload.data.contractor[0].lastName,
        username  : payload.data.contractor[0].username,
        Email     : payload.data.contractor[0].email
      });
    })

  },
  updateContractor() {
    var self = this;
    var firstName = '';
    var lastName  = '';
    var username  = '';
    var email  = '';

if(this.refs.firstName.value){
  firstName = this.refs.firstName.value
}else{
  firstName = this.state.firstName
}

if(this.refs.lastName.value){
  lastName = this.refs.lastName.value
}else{
  lastName = this.state.lastName
}

if(this.refs.username.value){
  username = this.refs.username.value
}else{
  username = this.state.username
}


if(this.refs.email.value){
  email = this.refs.email.value
}else{
  email = this.state.Email
}

    Dispatcher.dispatch({
      action : 'UPDATECONTRACTOR',
      data   : {
        firstName     : firstName,
        lastName      : lastName,
        username      : username,
        email         : email
      },
      id : this.props.params.id
    });

    userStore.on('contractorUpdated',function(){
      self.setState({
        success : true
      });
    })

    event.preventDefault();
  },
  render: function() {

    return (
      <div className="col-sm-4 col-md-8 col-lg-12">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" className="form-control" id="firstName" ref="firstName" placeholder={this.state.firstName}/>
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" className="form-control" id="lastName" ref="lastName" placeholder={this.state.lastName} />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" className="form-control" id="username" ref="username" placeholder={this.state.username} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" className="form-control" id="email" ref="email" placeholder={this.state.Email} />
        </div>


        <button type="submit" onClick={this.updateContractor} className="btn btn-default">Submit</button>
      </div>
    )
  },
});
module.exports = EditContractorInfo;
