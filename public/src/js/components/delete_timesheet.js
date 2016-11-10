var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var userStore      = require("../stores/userStore.js");
var Link           = require('react-router').Link;

userStore.on('TIMESHEETDEL',function(){
  browserHistory.push('/dashbored');
})

var ApproverHome = React.createClass({
  componentWillMount: function() {
    Dispatcher.dispatch({
      action : 'DELTIMESHEET',
      data : {
        id : this.props.params.id
      }
    })
  },
  render: function() {
    return (
      <div className="col-sm-4 col-md-8 col-lg-12">
        <h1>DeleteTime</h1>
      </div>
    )
  }
});
module.exports = ApproverHome;
