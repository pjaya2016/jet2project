var React          = require('react');
var browserHistory = require('react-router').browserHistory;
var Link           = require('react-router').Link

var Nav = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">JetTwoProject</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to='/login' className="glyphicon glyphicon-log-in">Login</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
});
module.exports = Nav;
