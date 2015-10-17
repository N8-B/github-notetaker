import 'bootstrap/less/bootstrap.less';
//import './main.css';

import React from 'react';
import Router from 'react-router';
import routes from './config/routes';

const app = document.createElement('div');
document.body.appendChild(app);

Router.run(routes, (Root, state) => {
  React.render(<Root { ...state } />, app);
});
