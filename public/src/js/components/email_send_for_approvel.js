var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var userStore      = require('../stores/userStore');
var Dispatcher     = require('../dispatchers/mainDispatcher.js');

var EmailSendForApprovel = React.createClass({
  componentWillMount: function() {
    if(this.props.params.boolean === 1){
      Dispatcher.dispatch({
        action : 'APPROVEDBYAPPROVER',
        userId : this.props.params.id
      })
      browserHistory.push('/approverviewuser')
    }else{
      Dispatcher.dispatch({
        action : 'DECLINEDBYAPPROVER',
        comment : 'Please Check timesheet and resubmit it',
        userId : this.props.params.id
      })
      browserHistory.push('/approverviewuser')
    }
  },
  render: function() {
    return (
      <div className="col-sm-4 col-md-8 col-lg-12">
        <h1>EmailSendForApprovel</h1>
      </div>
    )
  }
});
module.exports = EmailSendForApprovel;
