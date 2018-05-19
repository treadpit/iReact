import React from 'react';
import history from '../../lib/history';
import './index.scss';

export default class Topic extends React.Component {
  goto() {
    history.push('/articles');
  }
  render() {
    return (
      <div>
        <h3 className="color">{this.props.title || 'this is dialog'}</h3>
        <button onClick={this.goto}>click</button>
      </div>
    );
  }
}
