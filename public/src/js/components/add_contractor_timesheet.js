var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var TimeSheet = require('./timesheet');
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var userStore      = require("../stores/userStore.js");

var AddTimeSheet = React.createClass({
  getInitialState(){
    return{
      mondayHourWorked : 0,
      tuesdayHourWorked : 0,
      wednesdayHourWorked : 0,
      thursdayHourWorked : 0,
      fridayHourWorked : 0
    }
  },
  getData(event){

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
    return (
      <div className="col-sm-4 col-md-8 col-lg-12">
      <h5>TimeSheet ID : {this.props.params.id} </h5>
      <table className="table">
        <thead>
          <tr>
            <th>Day</th>
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
              <td>Monday</td>
              <td><input type="date" className="form-control" name='date' ref='date1'  /></td>
              <td><input type="time" className="form-control" name='timein' ref='timein1' onChange={this.monday}/></td>
              <td><input type="time" className="form-control" name='lunchstart'ref='lunchstart1' onChange={this.monday}/></td>
              <td><input type="time" className="form-control" name='lunchend' ref='lunchend1' onChange={this.monday}/></td>
              <td><input type="time" className="form-control" name='timeout' ref='timeout1' onChange={this.monday}/></td>
              <td><input type="text" className="form-control" name='hoursworked' ref='hoursworked1' value={this.state.mondayHourWorked} disabled/></td>
          </tr>
          <tr className="success form-group" >
              <td>Tuesday</td>
              <td><input type="date" className="form-control" name='date' ref='date2'  /></td>
              <td><input type="time" className="form-control" name='timein' ref='timein2' onChange={this.tuesday}/></td>
              <td><input type="time" className="form-control" name='lunchstart'ref='lunchstart2' onChange={this.tuesday}/></td>
              <td><input type="time" className="form-control" name='lunchend' ref='lunchend2' onChange={this.tuesday}/></td>
              <td><input type="time" className="form-control" name='timeout' ref='timeout2' onChange={this.tuesday}/></td>
              <td><input type="text" className="form-control" name='hoursworked' ref='hoursworked2' value={this.state.tuesdayHourWorked} disabled/></td>

          </tr>
          <tr className="success form-group" >
              <td>Wednesday</td>
              <td><input type="date" className="form-control" name='date' ref='date3'  /></td>
              <td><input type="time" className="form-control" name='timein' ref='timein3' onChange={this.wednesday}/></td>
              <td><input type="time" className="form-control" name='lunchstart'ref='lunchstart3' onChange={this.wednesday}/></td>
              <td><input type="time" className="form-control" name='lunchend' ref='lunchend3' onChange={this.wednesday}/></td>
              <td><input type="time" className="form-control" name='timeout' ref='timeout3' onChange={this.wednesday}/></td>
              <td><input type="text" className="form-control" name='hoursworked' ref='hoursworked3' value={this.state.wednesdayHourWorked} disabled/></td>
          </tr>
          <tr className="success form-group" >
              <td>Thursday</td>
              <td><input type="date" className="form-control" name='date' ref='date4'  /></td>
              <td><input type="time" className="form-control" name='timein' ref='timein4' onChange={this.thursday}/></td>
              <td><input type="time" className="form-control" name='lunchstart'ref='lunchstart4' onChange={this.thursday}/></td>
              <td><input type="time" className="form-control" name='lunchend' ref='lunchend4' onChange={this.thursday}/></td>
              <td><input type="time" className="form-control" name='timeout' ref='timeout4' onChange={this.thursday}/></td>
              <td><input type="text" className="form-control" name='hoursworked' ref='hoursworked4' value={this.state.thursdayHourWorked} disabled/></td>

          </tr>
          <tr className="success form-group" >
              <td>Firday</td>
              <td><input type="date" className="form-control" name='date' ref='date5'  /></td>
              <td><input type="time" className="form-control" name='timein' ref='timein5' onChange={this.friday}/></td>
              <td><input type="time" className="form-control" name='lunchstart'ref='lunchstart5' onChange={this.friday}/></td>
              <td><input type="time" className="form-control" name='lunchend' ref='lunchend5' onChange={this.friday}/></td>
              <td><input type="time" className="form-control" name='timeout' ref='timeout5' onChange={this.friday}/></td>
              <td><input type="text" className="form-control" name='hoursworked' ref='hoursworked5' value={this.state.fridayHourWorked} disabled/></td>

          </tr>
        </tbody>
      </table>
        <h4>Totle hours worked : {this.state.mondayHourWorked + this.state.tuesdayHourWorked + this.state.wednesdayHourWorked + this.state.thursdayHourWorked + this.state.fridayHourWorked   }</h4>
        <input type="button" className="form-control" value='save' onClick={this.getData} />
      </div>
    )
  }
});
module.exports = AddTimeSheet;
