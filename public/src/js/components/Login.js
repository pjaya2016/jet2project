var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var Nav = require('./Nav');

/****
components
****/



var Login = React.createClass({
  getData(event){



  },
  render: function() {
    return (
      <div>
        <Nav />
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
      </div>
    </div>
    )
  }
});

module.exports = Login;
