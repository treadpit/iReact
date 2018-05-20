import createAysncComp from '../components/aysncComp';

const routes = [
  {
    path: '/',
    exact: true,
    component: createAysncComp('pages/test'),
  },
  {
    path: '/dialog',
    component: createAysncComp('components/dialog'),
  },
];

export default routes;
