export default [
  {
    // user
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
        component: './Account/Register'
      },
      {
        path: '/admin/registerconfirm',
        component: './Account/RegisterConfirm'
      }
    ],
  },
  {
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
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin'],
    routes: [
      {
        path: '/',
        redirect: '/demo',
      },
      {
        path: '/demo',
        name:'demo',
        routes: [
          {
            path: '/demo/child1',
            name: 'child1',
            component: './Demo/Child1Page',
          },
          {
            path: '/demo/child2',
            component: './Demo/Child1Page',
          },
        ]
      },
      {
        path: '/demo2',
        name:'demo2',
        routes: [
          {
            path: '/demo2/child1',
            name: 'child1',
            component: './Demo2/Child2Page',
          },
          {
            path: '/demo2/child2',
            name: 'child2',
            component: './Demo2/Child2Page',
          },
        ]
      },
      {
        path:'/demo3',
        name:'demo3',
        component: './Demo3/DemoPage'
      },
      {
        component: '404',
      },
    ],
  },
];
