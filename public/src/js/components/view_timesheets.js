var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var userStore      = require("../stores/userStore.js");
var Link           = require('react-router').Link;

var ViewTimesheets = React.createClass({
  getInitialState(){
    return{
      timesheet : userStore.getTimeSheets()
    }
  },
  componentWillMount: function() {
    var self = this;
    Dispatcher.dispatch({
      action : 'GETTIMESHEET'
    })

    userStore.on('getTimeSheets',function(){
      self.setState({
        timesheet : userStore.getTimeSheets()
      });
    });

  },
  sendApprovel () {

    Dispatcher.dispatch({
      action : 'SENDFORAPPROVEL',
      data   : this.state.timesheet
    })

  },
  render: function() {


   if(this.state.timesheet){
    var self =this;
    var total = 0;
    var timesheets = self.state.timesheet.data.contractor.map(function(timesheet,i){
      console.log(timesheet)
      total += parseInt(timesheet.TotalHourWorked);
      return (
      <div key={i} className="well well-lg">
        <table className="table table-bordered table-responsive">
        <thead>
          <tr>
            <th>Day</th>
            <th>Dates</th>
            <th>Time In</th>
            <th>Lunch Start</th>
            <th>Lunch End</th>
            <th>Time Out</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monday</td>
            <td>{timesheet.Date1}</td>
            <td>{timesheet.Time1}</td>
            <td>{timesheet.LunchStart1}</td>
            <td>{timesheet.LunchEnd1}</td>
            <td>{timesheet.Timeout1}</td>
          </tr>
          <tr>
            <td>Tuesday</td>
            <td>{timesheet.Date2}</td>
            <td>{timesheet.Time2}</td>
            <td>{timesheet.LunchStart2}</td>
            <td>{timesheet.LunchEnd2}</td>
            <td>{timesheet.Timeout2}</td>
          </tr>
          <tr>
            <td>Wednessday</td>
            <td>{timesheet.Date3}</td>
            <td>{timesheet.Time3}</td>
            <td>{timesheet.LunchStart3}</td>
            <td>{timesheet.LunchEnd3}</td>
            <td>{timesheet.Timeout3}</td>
          </tr>
          <tr>
            <td>Thursday</td>
            <td>{timesheet.Date4}</td>
            <td>{timesheet.Time4}</td>
            <td>{timesheet.LunchStart4}</td>
            <td>{timesheet.LunchEnd4}</td>
            <td>{timesheet.Timeout4}</td>
          </tr>
          <tr>
            <td>Firday</td>
            <td>{timesheet.Date5}</td>
            <td>{timesheet.Time5}</td>
            <td>{timesheet.LunchStart5}</td>
            <td>{timesheet.LunchEnd5}</td>
            <td>{timesheet.Timeout5}</td>
          </tr>
        </tbody>
        </table>
        <h5>Total hour worked : {timesheet.TotalHourWorked} </h5>
      </div>
      )
    })
    return (
      <div className="col-lg-12">
        {timesheets}

        <h1>Total hour worked : {total}</h1>
        <button type="button"  onClick={this.sendApprovel} className="btn btn-success">Send For approvel</button>
      </div>
    )

  }else{

return(
  <h1>Loading</h1>
)

  }


  }
});
module.exports = ViewTimesheets;
