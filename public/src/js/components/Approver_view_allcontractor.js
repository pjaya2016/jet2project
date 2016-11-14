var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var userStore      = require('../stores/userStore');
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var Link           = require('react-router').Link
var socket         = require('socket.io-client')();



socket.on('chat message', function(msg){
  $('#alert').text('Contractor would like to chat with you live' );
});

var ar = [];
var ar2 = [];
var ApproverViewContarctor = React.createClass({
  getInitialState(){
    return{
      contractor : userStore.getContractors(),
    }
  },
  componentWillMount: function() {
    var self = this;
    Dispatcher.dispatch({
      action : 'GETCONTRACTOR'
    })
    userStore.on('getContractor',function(){
      self.setState({
        contractor : userStore.getContractors()
      });
    });

  },
  render: function() {
    var self = this;
    var timesheetNudge = '';
    if(this.state.contractor){
      var contractors = self.state.contractor.data.contractor.map(function(contractor,i){
          timesheetNudge = contractor.TimeSheet.map(function(timesheet,i){
          if(timesheet.Status === 'needApprovel'){
            ar.push(contractor.firstName)
          }
        });
        return (
          <tr key={i} className="success">
            <td>{contractor.startdate}</td>
            <td>{contractor.enddate}</td>
            <td>{contractor.firstName}</td>
            <td>{contractor.lastName}</td>
            <td><Link to={`editcontractor/${contractor._id}`}>Edit</Link></td>
            <td><Link to={`timesheet/${contractor._id}`}>View TimeSheets</Link></td>
            <td><Link to={`deletecontractor/${contractor._id}`}>Delete</Link></td>
          </tr>
        );
      });
      for(var i = 0 ; i < ar.length ; i++){
          if(ar[i] != ar[i + 1]){
            ar2.push(ar[i])
          }
      }
      var nudge = ar2.map(function(item,i){
        return(
          <div key={i} className="alert alert-warning">
            <strong>{item}</strong> Timesheets Needs Approvel.
          </div>
        )
      })
      return (
        <div>
          {nudge}
          <table className="table table-striped table-inverse">
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Edit</th>
                <th>View TimeSheets</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {contractors}
            </tbody>
          </table>
          <hr />
        <h3 id='alert'></h3>
        </div>
      )
    }else{
      return (
        <div className="loader"></div>
      )
    }
  },componentWillUnmount: function() {
    ar2 = [];
  },
});
module.exports = ApproverViewContarctor;
