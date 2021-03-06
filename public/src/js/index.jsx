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
var deleteTimesheet        = require('./components/delete_timesheet');
var search                 = require('./components/search_approved');
var paidInvoice            = require('./components/ViewPaidInvoice');
var InvoiceAdmin           = require('./components/invoiceAdmin');
var view_all_contractor_approved  = require('./components/all_contractor_approved.js');
var search_invoice_admin    = require('./components/search_invoice_admin.js');
var email_send_for_approvel = require('./components/email_send_for_approvel.js');
var redirectViewAllcontractor = require('./components/veiw_all_contarctor_redirect.js')
var Logout = require('./components/logout.js');
var LiveChat = require('./components/livechat.js');
var EditContractorInfo = require('./components/edit_contractor_info.js');
var deletecontractor = require('./components/deletecontractor.js');

/************************************************************************/
var token = localStorage.getItem('token');
var token = (!token)  ? true : false;


var App = React.createClass({
  render: function() {
    return (
      <div className="container" >
        <Nav  tokens={token}/>
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
      <Route path="/search" component={search} />
      <Route path="/deletetimesheets/:id" component={deleteTimesheet} />
      <Route path="/invoiceadmin/:id" component={InvoiceAdmin} />
      <Route path="/viewpaidinvoice" component={paidInvoice} />
      <Route path="/needpay" component={view_all_contractor_approved} />
      <Route path="/invoicesearch" component={search_invoice_admin} />
      <Route path="/emailsendforapprovel/:boolean/:id" component={email_send_for_approvel} />
      <Route path="/redirecttoapproverviewuser" component={redirectViewAllcontractor} />
      <Route path="/logout" component={Logout} />
      <Route path="/livechat" component={LiveChat} />
      <Route path="/editcontractor/:id" component={EditContractorInfo} />
      <Route path="/deletecontractor/:id" component={deletecontractor} />
    </Route>
  </Router>
  , document.getElementById('app'), function() {
    console.log('react app rendered successfully onto the dom!');
  })
