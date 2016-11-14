var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var userStore      = require('../stores/userStore');
var Dispatcher     = require('../dispatchers/mainDispatcher.js');


var Delete = React.createClass({
  componentWillMount: function() {
    Dispatcher.dispatch({
      action : 'DELETECONTRACTOR',
      id     : this.props.params.id
    })

  },

  render: function() {
    return (
    <h1>Delete</h1>
    )
  },
componentDidMount: function() {
  browserHistory.push('/approverviewuser')
},
});
module.exports = Delete;
