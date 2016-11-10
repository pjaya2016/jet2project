var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var Dispatcher     = require('../dispatchers/mainDispatcher.js');
var userStore      = require("../stores/userStore.js");
var Link           = require('react-router').Link;

var TimeSheet = React.createClass({

  render: function() {
    return (
      <tr className="success form-group" >
          <td>Monday</td>
          <td><input type="text" className="form-control" name='date' /></td>
          <td><input type="text" className="form-control" name='timein' /></td>
          <td><input type="text" className="form-control" name='lunchstart' /></td>
          <td><input type="text" className="form-control" name='lunchend' /></td>
          <td><input type="text" className="form-control" name='timeout' /></td>
          <td><input type="text" className="form-control" name='hoursworked' disabled/></td>
      </tr>
    )
  }
});
module.exports = TimeSheet;
