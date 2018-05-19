import React from 'react';
import './index.scss';

export default class Topic extends React.Component {
  render() {
    return <h3 className="color">{this.props.title || 'this is dialog'}</h3>;
  }
}
