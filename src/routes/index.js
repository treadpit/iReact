import createLoadableComp from '../components/loadableComp';

const routes = [
  {
    path: '/',
    exact: true,
    component(props) {
      return createLoadableComp('components/dialog');
    },
  },
  {
    path: '/Articles',
    component(props) {
      return createLoadableComp('pages/articles');
    },
  },
  {
    path: '/Dialog',
    component(props) {
      return createLoadableComp('components/dialog');
    },
  },
];

export default routes;
