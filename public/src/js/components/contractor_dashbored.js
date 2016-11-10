var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var userStore      = require("../stores/userStore.js");
var Link           = require('react-router').Link;

var ContractorDashbored = React.createClass({
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
  AddTimeSheet(){
    Dispatcher.dispatch({
      action : 'ADDTIMESHEET'
    })
   location.reload();
  },
  render: function() {
    var self = this;
    if(this.state.timesheet){
      var timesheets = self.state.timesheet.data.contractor.map(function(timesheet,i){
        return (
          <div key={i} className="card card-block">
            <h4 className="card-title">TimeSheet id : {timesheet._id}</h4>
            <p className="card-text"></p>
            <Link to={`/addtimesheet/${timesheet._id}`} > Edit </Link>
            <Link to={`/deletetimesheets/${timesheet._id}`} > Delete </Link>
          </div>
        )
      })
      console.log(timesheets.length);
      return (
        <div className="col-sm-4 col-md-8 col-lg-12">
            {timesheets.length == 5 ? <input type='button' className="btn btn-primary btn-lg" onClick={this.AddTimeSheet} value='add' disabled/> : <input type='button' className="btn btn-primary btn-lg" onClick={this.AddTimeSheet} value='add' /> }
            <Link className="btn btn-success btn-lg" to='/viewtimesheets' >Submit for approvel</Link>
            {timesheets}
        </div>
      )
    }else{
      return(
        <div className="loader"></div>
      )
    }
  }
});
module.exports = ContractorDashbored;
