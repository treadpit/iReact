import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import store from '../../store';
import createLoadableComp from '../../components/loadableComp';
import './index.scss';

import routes from '../../routes';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          {routes.map((route, i) => <Route key={i} exact={!!route.exact} path={route.path} component={route.component} />)}
          <Route render={() => createLoadableComp('pages/404')} />
        </Switch>
      </Provider>
    );
  }
}

export default hot(module)(App);
