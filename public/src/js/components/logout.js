var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;

var Logout = React.createClass({
  componentWillMount: function() {
    localStorage.removeItem('type');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    browserHistory.push('/login')
    location.reload();

  },
  render: function() {
    return (
      <div className="col-sm-4 col-md-8 col-lg-12">
        <h1>Logout</h1>
      </div>
    )
  }
});
module.exports = Logout;
