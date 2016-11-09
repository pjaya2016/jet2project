var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var userStore      = require("../stores/userStore.js");
/****
components
****/
var error          = (<div className="alert alert-danger">
                      <strong>Danger!</strong> Indicates a dangerous or potentially negative action.
                      </div>);

var Login = React.createClass({
  getInitialState(){
    return{
      error : false
    }
  },
  getData(event){
    var self = this;
    Dispatcher.dispatch({
        action : 'LOGIN',
        data : {
          username : this.refs.username.value,
          password : this.refs.password.value,
        }
      });
/////////////////listing for wrong login details
      userStore.on('wrongLoginDetails',function(){
        self.setState({
          error : true
        });
      })
  },
  render: function() {
    return (
      <div>
        <div className="col-sm-4 col-md-8 col-lg-12">
         <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" className="form-control" id="username" ref='username' />
         </div>

         <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input type="password" className="form-control" id="pwd" ref='password' />
         </div>

         <div className="checkbox">
          <label><input type="checkbox"/> Remember me</label>
         </div>
          <button type="submit" onClick={this.getData} className="btn btn-default">Submit</button>
          {this.state.error ? error : '' }
      </div>
    </div>
    )
  }
});
module.exports = Login;
