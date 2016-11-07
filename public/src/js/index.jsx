var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;

/*****
components
****/
var Login        = require('./components/Login');
var ApproverHome = require('./components/Approver_Home');
var Approveradduser = require('./components/Approver_add_contractor');


var App = React.createClass({
  render: function() {
    return (
        <div className="container" >
          <div className="row">
               {this.props.children}
          </div>
        </div>
    )
  }
});

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/approverhome" component={ApproverHome} />
      <Route path="/approveradduser" component={Approveradduser} />
  </Router>

  , document.getElementById('app'), function() {
  console.log('react app rendered successfully onto the dom!');
})
