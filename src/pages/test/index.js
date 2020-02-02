import React from 'react';
import { connect } from 'react-redux';
import history from '@/lib/history';
import { userInfo } from '@/actions';

class Topic extends React.Component {
  componentDidMount() {
    this.props.dispatch(userInfo(1212));
  }
  goto() {
    history.push('/dialog');
  }
  render() {
    return <h3 className="color" onClick={this.goto}>click me !!! test home page</h3>;
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  };
}

export default connect(mapStateToProps)(Topic);
