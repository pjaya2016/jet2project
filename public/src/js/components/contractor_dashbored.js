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
      timesheet : userStore.getTimeSheets(),
      comment : userStore.getComment()
    }
  },
  componentWillMount: function() {
    var self = this;
    Dispatcher.dispatch({
      action : 'GETTIMESHEET'
    })
    Dispatcher.dispatch({
      action : 'GETCOMMENT'
    })
    userStore.on('getTimeSheets',function(){
      self.setState({
        timesheet : userStore.getTimeSheets()
      });
    });
    userStore.on('getcomment',function(){
      self.setState({
        comment : userStore.getComment()
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
    var declined = ''
    if(this.state.timesheet){
      var timesheets = self.state.timesheet.data.contractor.map(function(timesheet,i){
         declined = timesheet.Status ;
         console.log(declined)
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
            {timesheets.length == 5 ? <input type='button' className="btn btn-danger btn-lg btn-block" onClick={this.AddTimeSheet} value='Add' disabled/> : <button className="btn btn-primary btn-lg btn-block" onClick={this.AddTimeSheet} >Add</button> }
            {timesheets.length != 0 ? <Link className="btn btn-success btn-lg btn-block" to='/viewtimesheets' >Submit for approvel</Link> : '' }
            {timesheets}
            {(declined === 'declined') ? <div className="alert alert-danger"><strong>timesheets send has been declined please check the infromation and resubmit</strong><h4>{(this.state.comment) ? ":      "+this.state.comment.data.contractor[0].comments : ''}</h4></div> : ''}
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
