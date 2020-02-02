import createLoadableComp from '@/components/loadableComp';

const routes = [
  {
    path: '/',
    exact: true,
    component(props) {
      return createLoadableComp('pages/test');
    },
  },
  {
    path: '/dialog',
    component(props) {
      return createLoadableComp('components/dialog');
    },
  },
];

export default routes;
