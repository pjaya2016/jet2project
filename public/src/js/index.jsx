var React                  = require('react');
var ReactDOM               = require('react-dom');
var Router                 = require('react-router').Router;
var Route                  = require('react-router').Route;
var browserHistory         = require('react-router').browserHistory;
/********
components
*********/
var Login                  = require('./components/Login');
var ApproverHome           = require('./components/Approver_Home');
var Approveradduser        = require('./components/Approver_add_contractor');
var ApproverViewContarctor = require('./components/Approver_view_allcontractor');
var TimeSheet              = require('./components/contractor_timesheet');
var Nav                    = require('./components/Nav');
var AddTimeSheet           = require('./components/add_contractor_timesheet');
var dashbored              = require('./components/contractor_dashbored');
var ViewTimesheets         = require('./components/view_timesheets');
var deleteTimesheet         = require('./components/delete_timesheet');
/************************************************************************/
var App = React.createClass({
  render: function() {
    return (
        <div className="container" >
          <Nav />
          <div className="row">
               {this.props.children}
          </div>
        </div>
    )
  }
});

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <Route path="/login" component={Login} />
      <Route path="/approverhome"  component={ApproverHome} />
      <Route path="/approveradduser" component={Approveradduser} />
      <Route path="/approverviewuser" component={ApproverViewContarctor} />
      <Route path="/timesheet/:id" component={TimeSheet} />
      <Route path="/addtimesheet/:id" component={AddTimeSheet} />
      <Route path="/viewtimesheets" component={ViewTimesheets} />
      <Route path="/dashbored" component={dashbored} />
      <Route path="/deletetimesheets/:id" component={deleteTimesheet} />
    </Route>
  </Router>
  , document.getElementById('app'), function() {
  console.log('react app rendered successfully onto the dom!');
})
