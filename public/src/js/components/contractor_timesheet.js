var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;

var Timesheet = React.createClass({
  render: function() {
    console.log(this.props.params.id)
    return (
      <div className="col-sm-4 col-md-8 col-lg-12">
        <h3>Timesheet User ID : {this.props.params.id}</h3>
      </div>
    )
  }
});
module.exports = Timesheet;
