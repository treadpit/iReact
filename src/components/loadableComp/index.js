
import React from 'react';
import Loadable from 'react-loadable';

function Loading(props) {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}

export default path => {
  let Comp;
  if (/components/.test(path)) {
    const compName = path.replace(/(.*\/)?components\/(.*)/, '$2');
    Comp = Loadable({
      loader: () => import(`../${compName}`), // import不能传直接传变量，只能写死字符串
      loading: Loading,
    });
  } else if (/pages/.test(path)) {
    const compName = path.replace(/(.*\/)?pages\/(.*)/, '$2');
    Comp = Loadable({
      loader: () => import(`../../pages/${compName}`),
      loading: Loading,
      delay: 300, // 0.3 seconds
      timeout: 8000, // 8 seconds
    });
  }
  return <Comp />;
};
