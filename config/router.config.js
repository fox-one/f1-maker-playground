export default [
  {
    // user login and register
    path: '/admin',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/login',
      },
      {
        path: '/admin/login',
        component: './Account/Login',
      },
      {
        path: '/admin/register',
        component: './Account/Register',
      },
      {
        path: '/admin/registerconfirm',
        component: './Account/RegisterConfirm',
      },
    ],
  },
  {
    // exception
    name: 'exception',
    component: '../layouts/UserLayout',
    path: '/exception',
    routes: [
      {
        path: '/exception/403',
        name: 'not-permission',
        component: './Exception/403',
      },
      {
        path: '/exception/404',
        name: 'not-find',
        component: './Exception/404',
      },
      {
        path: '/exception/500',
        name: 'server-error',
        component: './Exception/500',
      },
    ],
  },
  {
    // after login
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin'],
    routes: [
      {
        path: '/',
        redirect: '/demo/child1',
      },
      {
        path: '/demo',
        name: 'demo',
        routes: [
          {
            path: '/demo/child1',
            name: 'child1',
            component: './Demo/Child1Page',
          },
          {
            path: '/demo/child2',
            component: './Demo/Child2Page',
          },
        ],
      },
      {
        path: '/demo2',
        name: 'demo2',
        component: './Demo2/DemoPage',
      },
      {
        component: '404',
      },
    ],
  },
];
