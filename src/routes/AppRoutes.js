import { PATH_APP } from './paths';
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthProtect from '~/components/Auth/AuthProtect';
import AppLayout from '~/layouts/AppLayout';

// ----------------------------------------------------------------------

// App Routes

const AppRoutes = {
  path: PATH_APP.root,
  guard: AuthProtect,
  layout: AppLayout,
  routes: [

    // Echo dashboard
    {
      exact: true,
      path: PATH_APP.main.dashboard,
      component: lazy(() => import('src/views/general/AppView'))
    },

    // A specific Echo
    {
      exact: true,
      path: PATH_APP.main.echo,
      component: lazy(() => import('src/views/general/EchoView'))
    },

    // Root redirect
    {
      exact: true,
      path: PATH_APP.root,
      component: () => <Redirect to={PATH_APP.main.root} />
    },

    // Errors
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default AppRoutes;
