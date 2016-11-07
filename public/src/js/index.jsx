var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
  render: function() {
    return (
      <h1>App is loaded</h1>
    )
  }
});

ReactDOM.render(<App />, document.getElementById('app'), function() {
  console.log('react app rendered successfully onto the dom!');
})
