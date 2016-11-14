var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;

var type  = localStorage.getItem('type');

// if(type == 'approver'){
//   browserHistory.push('/approverviewuser');
// }else if(type == 'contractor'){
//   browserHistory.push('/dashbored');
// }else if(type == 'invoice_admin'){
//   browserHistory.push('/needpay');
// }

var ApproverHome = React.createClass({

  render: function() {
    return (
      <div className="col-sm-4 col-md-8 col-lg-12">
        <h1>Welcome : {type}</h1>
      </div>
    )
  },
});
module.exports = ApproverHome;
