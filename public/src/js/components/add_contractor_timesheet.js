var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var TimeSheet = require('./timesheet');
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var userStore      = require("../stores/userStore.js");

var data = {};

var AddTimeSheet = React.createClass({
  componentWillMount(){
    var self = this;
    Dispatcher.dispatch({
      action : 'GETIDTIMESHEET',
      data   : this.props.params.id
    })
    userStore.on('getIdTimeSheets',function(){
        self.setState({
          getTimeSheets : userStore.getIdTimeSheets()
        })
    })
  },
  getInitialState(){
    return{
      getTimeSheets : userStore.getIdTimeSheets(),
      mondayHourWorked : 0,
      tuesdayHourWorked : 0,
      wednesdayHourWorked : 0,
      thursdayHourWorked : 0,
      fridayHourWorked : 0
    }
  },
  getData(event){
    data.date1   = this.refs.date1.value;
    data.timein1 = this.refs.timein1.value;
    data.lunchstart1 = this.refs.lunchstart1.value;
    data.lunchend1   = this.refs.lunchend1.value;
    data.Timeout1   = this.refs.timeout1.value;

    data.date2  = this.refs.date2.value;
    data.timein2 = this.refs.timein2.value
    data.lunchstart2 = this.refs.lunchstart2.value;
    data.lunchend2   = this.refs.lunchend2.value;
    data.Timeout2   = this.refs.timeout2.value;

    data.date3  = this.refs.date3.value;
    data.timein3 = this.refs.timein3.value
    data.lunchstart3 = this.refs.lunchstart3.value;
    data.lunchend3   = this.refs.lunchend3.value;
    data.Timeout3   = this.refs.timeout3.value;

    data.date4  = this.refs.date4.value;
    data.timein4 = this.refs.timein4.value
    data.lunchstart4 = this.refs.lunchstart4.value;
    data.lunchend4  = this.refs.lunchend4.value;
    data.Timeout4   = this.refs.timeout4.value;

    data.date5  = this.refs.date5.value;
    data.timein5 = this.refs.timein5.value
    data.lunchstart5 = this.refs.lunchstart5.value;
    data.lunchend5 = this.refs.lunchend5.value;
    data.Timeout5   = this.refs.timeout5.value;

    data.totalWorkedHour = this.state.mondayHourWorked + this.state.tuesdayHourWorked + this.state.wednesdayHourWorked + this.state.thursdayHourWorked + this.state.fridayHourWorked ;

    Dispatcher.dispatch({
       action : 'TIMESHEETDATASEND',
       data   : {
         id : this.props.params.id,
         timesheetData : data
                }
    })

  },
monday(){
 var self = this;
 var totalDay = parseInt(this.refs.timeout1.value) - parseInt(this.refs.timein1.value)
 var totalLuch = parseInt(this.refs.lunchend1.value) - parseInt(this.refs.lunchstart1.value)
 var workedHour = totalDay - totalLuch;
  if(workedHour > 0 && workedHour != 'NaN'){
    self.setState({
        mondayHourWorked : workedHour
    });
  }
},
tuesday(){
  var self = this;
  var totalDay = parseInt(this.refs.timeout2.value) - parseInt(this.refs.timein2.value)
  var totalLuch = parseInt(this.refs.lunchend2.value) - parseInt(this.refs.lunchstart2.value)
  var workedHour = totalDay - totalLuch;
   if(workedHour > 0 && workedHour != 'NaN'){
     self.setState({
         tuesdayHourWorked : workedHour
     });
   }
},
wednesday(){
  var self = this;
  var totalDay = parseInt(this.refs.timeout3.value) - parseInt(this.refs.timein3.value)
  var totalLuch = parseInt(this.refs.lunchend3.value) - parseInt(this.refs.lunchstart3.value)
  var workedHour = totalDay - totalLuch;
   if(workedHour > 0 && workedHour != 'NaN'){
     self.setState({
         wednesdayHourWorked : workedHour
     });
   }
},
thursday(){
  var self = this;
  var totalDay = parseInt(this.refs.timeout4.value) - parseInt(this.refs.timein4.value)
  var totalLuch = parseInt(this.refs.lunchend4.value) - parseInt(this.refs.lunchstart4.value)
  var workedHour = totalDay - totalLuch;
   if(workedHour > 0 && workedHour != 'NaN'){
     self.setState({
         thursdayHourWorked : workedHour
     });
   }
},
friday(){
  var self = this;
  var totalDay = parseInt(this.refs.timeout5.value) - parseInt(this.refs.timein5.value)
  var totalLuch = parseInt(this.refs.lunchend5.value) - parseInt(this.refs.lunchstart5.value)
  var workedHour = totalDay - totalLuch;
   if(workedHour > 0 && workedHour != 'NaN'){
     self.setState({
         fridayHourWorked : workedHour
     });
   }
},
  render: function() {

if(this.state.getTimeSheets){

  console.log(this.state.getTimeSheets.data.TimeSheetID)
    return (
      <div className="col-sm-4 col-md-8 col-lg-12">
      <h5>TimeSheet ID : {this.props.params.id} </h5>

      <table className="table">
        <thead>
          <tr>
            <th>Dates</th>
            <th>Time In</th>
            <th>Lunch Start</th>
            <th>Lunch End</th>
            <th>Time Out</th>
            <th>Hours worked</th>
          </tr>
        </thead>
        <tbody>
          <tr className="success form-group" >
              <td><input type="text" className="form-control" name='date' ref='date1' defaultValue={this.state.getTimeSheets.data.TimeSheetID.Date1} /></td>
              <td><input type="time" className="form-control" name='timein' ref='timein1' onChange={this.monday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.Time1}/></td>
              <td><input type="time" className="form-control" name='lunchstart'ref='lunchstart1' onChange={this.monday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.LunchStart1}/></td>
              <td><input type="time" className="form-control" name='lunchend' ref='lunchend1' onChange={this.monday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.LunchEnd1}/></td>
              <td><input type="time" className="form-control" name='timeout' ref='timeout1' onChange={this.monday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.Timeout1}/></td>
              <td><input type="text" className="form-control" name='hoursworked' ref='hoursworked1' value={this.state.mondayHourWorked} disabled/></td>
          </tr>
          <tr className="success form-group" >
              <td><input type="text" className="form-control" name='date' ref='date2' defaultValue={this.state.getTimeSheets.data.TimeSheetID.Date2}  /></td>
              <td><input type="time" className="form-control" name='timein' ref='timein2' onChange={this.tuesday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.Time2}/></td>
              <td><input type="time" className="form-control" name='lunchstart'ref='lunchstart2' onChange={this.tuesday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.LunchStart2}/></td>
              <td><input type="time" className="form-control" name='lunchend' ref='lunchend2' onChange={this.tuesday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.LunchEnd2}/></td>
              <td><input type="time" className="form-control" name='timeout' ref='timeout2' onChange={this.tuesday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.Timeout2}/></td>
              <td><input type="text" className="form-control" name='hoursworked' ref='hoursworked2' value={this.state.tuesdayHourWorked} disabled/></td>

          </tr>
          <tr className="success form-group" >
              <td><input type="text" className="form-control" name='date' ref='date3' defaultValue={this.state.getTimeSheets.data.TimeSheetID.Date3}  /></td>
              <td><input type="time" className="form-control" name='timein' ref='timein3' onChange={this.wednesday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.Time3}/></td>
              <td><input type="time" className="form-control" name='lunchstart'ref='lunchstart3' onChange={this.wednesday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.LunchStart3}/></td>
              <td><input type="time" className="form-control" name='lunchend' ref='lunchend3' onChange={this.wednesday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.LunchEnd3} /></td>
              <td><input type="time" className="form-control" name='timeout' ref='timeout3' onChange={this.wednesday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.Timeout3} /></td>
              <td><input type="text" className="form-control" name='hoursworked' ref='hoursworked3' value={this.state.wednesdayHourWorked} disabled/></td>
          </tr>
          <tr className="success form-group" >
              <td><input type="text" className="form-control" name='date' ref='date4' defaultValue={this.state.getTimeSheets.data.TimeSheetID.Date4}  /></td>
              <td><input type="time" className="form-control" name='timein' ref='timein4' onChange={this.thursday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.Time4}/></td>
              <td><input type="time" className="form-control" name='lunchstart'ref='lunchstart4' onChange={this.thursday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.LunchStart4}/></td>
              <td><input type="time" className="form-control" name='lunchend' ref='lunchend4' onChange={this.thursday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.LunchEnd4}/></td>
              <td><input type="time" className="form-control" name='timeout' ref='timeout4' onChange={this.thursday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.Timeout4}/></td>
              <td><input type="text" className="form-control" name='hoursworked' ref='hoursworked4' value={this.state.thursdayHourWorked} disabled/></td>

          </tr>
          <tr className="success form-group" >
              <td><input type="text" className="form-control" name='date' ref='date5' defaultValue={this.state.getTimeSheets.data.TimeSheetID.Date5}  /></td>
              <td><input type="time" className="form-control" name='timein' ref='timein5' onChange={this.friday}  defaultValue={this.state.getTimeSheets.data.TimeSheetID.Time5}/></td>
              <td><input type="time" className="form-control" name='lunchstart'ref='lunchstart5' onChange={this.friday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.LunchStart5}/></td>
              <td><input type="time" className="form-control" name='lunchend' ref='lunchend5' onChange={this.friday}defaultValue={this.state.getTimeSheets.data.TimeSheetID.LunchEnd5}/></td>
              <td><input type="time" className="form-control" name='timeout' ref='timeout5' onChange={this.friday} defaultValue={this.state.getTimeSheets.data.TimeSheetID.Timeout5}/></td>
              <td><input type="text" className="form-control" name='hoursworked' ref='hoursworked5' value={this.state.fridayHourWorked} disabled/></td>
          </tr>
        </tbody>
      </table>
        <h4>Totle hours worked : {this.state.mondayHourWorked + this.state.tuesdayHourWorked + this.state.wednesdayHourWorked + this.state.thursdayHourWorked + this.state.fridayHourWorked   }</h4>
        <input type="button" className="form-control" value='save' onClick={this.getData} />
      </div>
    )
  }else{
    return(
      <h1>Loading</h1>
    )
  }
},
});
module.exports = AddTimeSheet;
