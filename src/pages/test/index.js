import React from 'react';
import history from '../../lib/history';

export default class Topic extends React.Component {
  goto() {
    history.push('/dialog');
  }
  render() {
    return <h3 className="color" onClick={this.goto}>click me !!! test home page</h3>;
  }
}
