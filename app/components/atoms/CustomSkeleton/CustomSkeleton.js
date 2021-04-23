/**
 *
 * CustomSkeleton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import withStyles from 'utils/withStyles';

import CapSkeleton from '@capillarytech/cap-ui-library/CapSkeleton';

import styles from './style';

const CustomSkeleton = ({
  avatar,
  height,
  width,
  isTitle,
  isAvatar,
  className,
  isParagraph,
  borderRadius,
  ...rest
}) => (
  <CapSkeleton
    active
    width={width}
    height={height}
    title={isTitle}
    avatar={isAvatar}
    paragraph={isParagraph}
    borderRadius={borderRadius}
    className={classnames('custom-skeleton', className)}
    {...rest}
  />
);

CustomSkeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  borderRadius: PropTypes.string,
  isTitle: PropTypes.bool,
  isAvatar: PropTypes.bool,
  isParagraph: PropTypes.bool,
};

CustomSkeleton.defaultProps = {
  width: '',
  height: '',
  className: '',
  isTitle: false,
  isAvatar: false,
  borderRadius: '',
  isParagraph: false,
};

export default withStyles(CustomSkeleton, styles);
