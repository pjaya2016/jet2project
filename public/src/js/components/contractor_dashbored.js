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
            <Link to='' > Delete </Link>
          </div>
        )
      })
      return (
        <div className="col-sm-4 col-md-8 col-lg-12">
          <input type='button' onClick={this.AddTimeSheet} value='add'  />
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
