/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React from 'react';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import history from 'utils/history';
import { userIsAuthenticated } from '../../../utils/authWrapper';

// import Cap from '../Cap';
import Login from '../Login';
// import Login from '../components/templates/Login';
import Product from '../../../src/Product';
import ProductAdd from '../../../src/ProductAdd';
import NotFoundPage from '../NotFoundPage';

import GlobalStyle from '../../../global-styles';
import { addPath, publicPath } from '../../../config/path';
import config from '../../../config/app';

import RenderRoute from '../../atoms/RenderRoute';
import { PRODUCTION } from '../Cap/constants';
import { HomePage } from '../HomePage/HomePage';

const loginUrl =
  process.env.NODE_ENV === PRODUCTION
    ? config.production.login_url
    : config.development.login_url;

const Protected = userIsAuthenticated(Product);

export const App = () => (
  <>
    <ConnectedRouter history={history}>
      <Switch>
        <RenderRoute exact path={loginUrl} component={Login} />
        <RenderRoute
          exact
          path={publicPath}
          component={Protected}
          key={publicPath}
        />
        <RenderRoute
          exact
          path={addPath}
          component={ProductAdd}
          key={addPath}
        />
        <RenderRoute exact path="/book-list" component={HomePage} />
        <RenderRoute component={NotFoundPage} />
      </Switch>
    </ConnectedRouter>
    <GlobalStyle />
  </>
);

export default App;
