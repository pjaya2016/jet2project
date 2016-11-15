var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var userStore      = require('../stores/userStore');
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var Link           = require('react-router').Link

var InvoiceSend = React.createClass({
  getInitialState(){
    return {
      invoice : userStore.getInvoice()
    }
  },
  componentWillMount: function() {
    var self = this;
    Dispatcher.dispatch({
      action : 'INVOICE',
      id : {
        userId : this.props.params.id
      }
    })
    userStore.on('invoice',function(){
      self.setState({
        invoice : userStore.getInvoice()
      })
    })
  },
  paid(){
    Dispatcher.dispatch({
      action : 'PAID',
      id : {
        userId : this.props.params.id
      }
    })
  },
  render: function() {
    if(this.state.invoice){
       var invoice = this.state.invoice.data.needToPay.map(function(timesheet,i){
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
         <div className="col-sm-4 col-md-8 col-lg-12">
           <h1>TimeSheets needs to be paid </h1>
           {invoice}
           <p>
              <a onClick={this.paid} className="btn btn-info btn-lg">
                <span className="glyphicon glyphicon-gbp"></span> Pay
              </a>
           </p>

         </div>
       )
     }else{
       return (
         <div className="col-sm-4 col-md-8 col-lg-12">
           <h1>InvoiceSend</h1>
         </div>
       )
     }
   }
});
module.exports = InvoiceSend;
//   <input type='button' value='paid' onClick={this.paid}/>
