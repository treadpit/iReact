import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './index.scss';

export default class Articles extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/articles' render={(props) => (<div>this is article home</div>)}></Route>
      </Switch>
    );
  }
}
