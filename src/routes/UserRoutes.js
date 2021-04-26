import { PATH_USER } from './paths';
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthProtect from '~/components/Auth/AuthProtect';
import AuxLayout from '~/layouts/AuxLayout';

// ----------------------------------------------------------------------

// User Routes

const UserRoutes = {
  path: '/user',
  guard: AuthProtect,
  layout: AuxLayout,
  routes: [
    
    // Account
    {
      exact: true,
      path: PATH_USER.account,
      component: lazy(() => import('src/views/general/AccountView'))
    },

    // Account Setup
    {
      exact: true,
      path: PATH_USER.accountSetup,
      component: lazy(() => import('src/views/general/AccountSetupView'))
    },

    // Integrations
    {
      exact: true,
      path: PATH_USER.integrations,
      component: lazy(() => import('src/views/general/IntegrationsView'))
    },

    // Root redirect
    {
      exact: true,
      path: PATH_USER.root,
      component: () => <Redirect to={PATH_USER.root} />
    },

    // Errors
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default UserRoutes;
