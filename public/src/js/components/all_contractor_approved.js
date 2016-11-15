/*******************View all contarctor **********/
var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var userStore      = require('../stores/userStore');
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var Link           = require('react-router').Link

var ar  = [];
var ar2 = [];

var ApproverViewContarctor = React.createClass({
  getInitialState(){
    return{
      contractor : userStore.getContractors()
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
    var ApprovedNudge = '';

    if(this.state.contractor){
      var contractors = self.state.contractor.data.contractor.map(function(contractor,i){
          ApprovedNudge = contractor.TimeSheet.map(function(timesheet,i){
            if(timesheet.Status === 'approved'){
              ar.push(contractor.firstName)
            }
          });
        });


      var contractors = self.state.contractor.data.contractor.map(function(contractor,i){
        return (
          <tr key={i} className="success">
            <td>{contractor.startdate}</td>
            <td>{contractor.enddate}</td>
            <td>{contractor.firstName}</td>
            <td>{contractor.lastName}</td>
            <td><Link to={`invoiceadmin/${contractor._id}`}>View TimeSheets</Link></td>
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
          <div key={i} className="alert alert-info">
            <strong>{item}</strong> Timesheets Needs Paid.
          </div>
        )
      })
      return (
        <div>
          {nudge}
        <table className="table">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>View TimeSheets</th>
            </tr>
          </thead>
          <tbody>
            {contractors}
          </tbody>
        </table>

      </div>
      )
    }else{
      return (
        <div className="loader"></div>
      )
    }
  }
});
module.exports = ApproverViewContarctor;
