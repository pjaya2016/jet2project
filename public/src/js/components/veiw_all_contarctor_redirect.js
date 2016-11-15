var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;



var redirectViewAllcontractor = React.createClass({
  componentWillMount: function() {
    location.reload();
    browserHistory.push('/approverviewuser');

  },
  render: function() {
    return (
      <div className="col-sm-4 col-md-8 col-lg-12">

      </div>
    )
  },


});
module.exports = redirectViewAllcontractor;
