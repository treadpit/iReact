import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './lib/history';

import App from './pages/app';

ReactDOM.render(
  // <Provider store={store}>
  <Router history={history}>
    <App />
  </Router>,
  // </Provider>,
  document.getElementById('app')
);
