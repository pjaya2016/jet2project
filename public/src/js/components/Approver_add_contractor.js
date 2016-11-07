var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var userStore      = require("../stores/userStore.js");


var successMsg     =  (<div className="alert alert-success">
                        <strong>Success!</strong> Indicates a successful or positive action.
                       </div>);

var Approveradduser = React.createClass({
  getInitialState() {
    return{
      success : false
    }
  },
  createContractor(event){
    var self = this;
    Dispatcher.dispatch({
        action : 'REGISTER',
        data : {
          firstName : this.refs.firstName.value,
          lastName : this.refs.lastName.value,
          username : this.refs.username.value,
          passwordHash : this.refs.passwordHash.value,
          passwordConfirmation : this.refs.passwordConfirmation.value,
          email : this.refs.email.value,
          type: this.refs.type.value,
        }
      });

      userStore.on('contractorCreated',function(){
        self.setState({
          success : true
        });
      })

    event.preventDefault();
  },
  render: function() {
    console.log(this.state.success)
    return (
      <div className="col-sm-4 col-md-8 col-lg-12">

              {this.state.success ? successMsg : '' }

              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input type="text" className="form-control" id="firstName" ref="firstName" />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" className="form-control" id="lastName" ref="lastName" />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" className="form-control" id="username" ref="username" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text" className="form-control" id="email" ref="email" />
              </div>

              <div className="form-group">
                <label htmlFor="type">Type:</label>
                <input type="text" className="form-control" id="type" ref="type" />
              </div>

              <div className="form-group">
                <label htmlFor="passwordHash">Password:</label>
                <input type="password" className="form-control" id="passwordHash" ref="passwordHash" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Confirm password:</label>
                <input type="password" className="form-control" id="password" ref="passwordConfirmation" />
              </div>

              <button type="submit" onClick={this.createContractor} className="btn btn-default">Submit</button>
      </div>
    )
  }
});

module.exports = Approveradduser;
