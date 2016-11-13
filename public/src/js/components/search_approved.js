var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var userStore      = require("../stores/userStore.js");
var Link           = require('react-router').Link;

var ApproverHome = React.createClass({
  getInitialState(){
    return {
      search : userStore.getSearchResult()
    }
  },
  search(e){
    var self = this ;
    Dispatcher.dispatch({
      action : 'SEARCH',
      searchInfo : e.target.value
    });

    userStore.on('search',function(){
      self.setState({
        search : userStore.getSearchResult()
      })
    })
  },
  render: function() {
    if(this.state.search){
      var search = this.state.search.data.search.map(function(timesheet,i){
        return (
          <div key={i} className="well well-lg">
            <table className="table table-striped table-inverse table-bordered table-responsive">
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
        <div className="col-sm-4 col-md-8 col-lg-12">
          <input type="button" onClick={this.search}  value='approved' className="btn btn-primary" />
          <input type="button" onClick={this.search}  value='needApprovel' className="btn btn-primary" />
          <input type="button" onClick={this.search}  value='declined' className="btn btn-primary" />
          <hr />
          {search}
          <hr />
        </div>
      )
    }else{
      return (
        <div className="col-sm-4 col-md-8 col-lg-12">
          <input type="button" onClick={this.search}  value='approved' className="btn btn-primary" />
          <input type="button" onClick={this.search}  value='needApprovel' className="btn btn-primary" />
          <input type="button" onClick={this.search}  value='declined' className="btn btn-primary" />
        </div>
      )
    }
  }
});
module.exports = ApproverHome;
