import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'utils/withStyles';
import styles from './style';

export const Heading = ({ className, children }) => (
  <h2 className={classnames(styles.heading, className)}>{children}</h2>
);

Heading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Heading.defaultProps = {
  className: '',
};

export default withStyles(Heading, styles);
