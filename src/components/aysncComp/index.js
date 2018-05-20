import React, { Component } from 'react';

function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
};

export default function createAysncComp(path) {
  let compName;
  if (/components/.test(path)) {
    compName = path.replace(/(.*\/)?components\/(.*)/, '$2');
    return asyncComponent(() => import(`../${compName}`));
  } else if (/pages/.test(path)) {
    compName = path.replace(/(.*\/)?pages\/(.*)/, '$2');
    return asyncComponent(() => import(`../../pages/${compName}`));
  }
};
