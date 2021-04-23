/**
 * RenderRoute
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

export const RenderRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

RenderRoute.propTypes = {
  component: PropTypes.any,
};

export default RenderRoute;
