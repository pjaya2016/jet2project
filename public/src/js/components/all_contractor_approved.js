var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var userStore      = require('../stores/userStore');
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var Link           = require('react-router').Link

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
    //  console.log(this.state.contractor);
    if(this.state.contractor){
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
      return (
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
              )
    }else{
      return (
        <div className="loader"></div>
             )
    }
  }
});
module.exports = ApproverViewContarctor;
