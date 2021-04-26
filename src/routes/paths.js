// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS = {
  auth: '/auth',
  app: '/app',
  user: '/user'
};

export const PATH_PAGE = {
  auth: {
    root: ROOTS.auth,
    login: path(ROOTS.auth, '/login'),
    loginUnprotected: path(ROOTS.auth, '/login-unprotected'),
    register: path(ROOTS.auth, '/register'),
    registerUnprotected: path(ROOTS.auth, '/register-unprotected'),
    resetPassword: path(ROOTS.auth, '/reset-password'),
    verify: path(ROOTS.auth, '/verify')
  }
};

export const PATH_APP = {
  root: ROOTS.app,
  main: {
    root: path(ROOTS.app, '/dashboard'),
    dashboard: path(ROOTS.app, '/dashboard'),
    echo: path(ROOTS.app, '/dashboard/:echoKey')
  }
};

export const PATH_USER = {
  root: path(ROOTS.user, '/account'),
  account: path(ROOTS.user, '/account'),
  accountSetup: path(ROOTS.user, '/accountSetup'),
  integrations: path(ROOTS.user, '/integrations')
}
