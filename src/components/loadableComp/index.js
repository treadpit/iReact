
import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../loading';
import LoadError from '../loadError';
import LoadTimeout from '../loadTimeout';

function LoadingFn(props) {
  if (props.error) {
    return <LoadError />;
  } else if (props.timedOut) {
    return <LoadTimeout />;
  } else if (props.pastDelay) {
    return <Loading />;
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
      loading: LoadingFn,
    });
  } else if (/pages/.test(path)) {
    const compName = path.replace(/(.*\/)?pages\/(.*)/, '$2');
    Comp = Loadable({
      loader: () => import(`../../pages/${compName}`),
      loading: Loading,
      delay: 300, // 0.3 seconds
      timeout: 10000, // 10 seconds
    });
  }
  return <Comp />;
};
