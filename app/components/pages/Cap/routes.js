import { lazy } from 'react';
import * as path from '../../../config/path';

const { publicPath } = path;

const routes = [
  {
    exact: true,
    path: `${publicPath}/dashboard`,
    type: 'dashboard',
    component: lazy(() => import('../Dashboard')),
  },
  {
    exact: true,
    path: `${publicPath}/accessForbidden`,
    type: 'authenticationFlow',
    component: lazy(() => import('../AccessForbidden')),
  },
  {
    exact: true,
    path: `${publicPath}/profile-page`,
    type: 'profilePage',
    component: lazy(() => import('../ProfilePage')),
  },

];

export default routes;
