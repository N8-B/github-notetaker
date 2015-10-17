require('bootstrap/less/bootstrap.less');
//require('./main.css');

var React = require('react');
var Router = require('react-router');
var routes = require('./config/routes');

const app = document.createElement('div');
document.body.appendChild(app);

Router.run(routes, function (Root) {
  React.render(<Root />, app);
});
