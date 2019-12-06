const loadView = view => () =>
  import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);

const routes = [
  {
    path: '/',
    name: 'home',
    component: loadView('Home')
  },
  {
    path: '/auth',
    component: loadView('auth/Auth'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: loadView('auth/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: loadView('auth/Register')
      }
    ]
  }
];

export default routes;
