/** @jsx React.DOM */

var React = require('react');

require('../styles/main.scss');

var HelloWorld = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h1 className="page-header">Hello, world!</h1>
      </div>
    );
  }
});

React.renderComponent(<HelloWorld />, document.getElementById('content'));
