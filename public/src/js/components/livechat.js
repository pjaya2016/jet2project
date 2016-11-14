var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;
var Route          = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var socket         = require('socket.io-client')();

var str = '';
var type = localStorage.getItem('type')

socket.on('chat message', function(msg){
  $('#messages').append($('<p>').text(type + ' :' +msg));
});

var LiveChat = React.createClass({
  componentWillMount: function() {
    socket.on('connect', function(){

    });
  },
  send(){
     socket.emit('chat message', this.refs.send.value);
  },
  render: function() {

    return (
      <div className="col-sm-4 col-md-8 col-lg-12">

      <h1>Live Chat </h1>

      <h3 id='messages'></h3>

      <input type='text'  ref='send'  />
      <input type='button' value='send'  onClick={this.send} />
      </div>
    )
  },
});
module.exports = LiveChat;
