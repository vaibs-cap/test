/**
 * StatusColor
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';
import StyledDiv from './style';

const {
  CAP_PRIMARY,
  CAP_SECONDARY,
  CAP_G06,
  CAP_ORANGE,
  CAP_YELLOW,
  CAP_RED,
  CAP_WHITE,
  CAP_SPACE_08,
} = styledVars;

const color = {
  live: CAP_PRIMARY.base,
  lapsed: CAP_G06,
  upcoming: CAP_SECONDARY.base,
  completed: CAP_SECONDARY.base,
  sent: CAP_G06,
  awaiting_approval: CAP_ORANGE,
  processing: CAP_PRIMARY.base,
  open: CAP_PRIMARY.base,
  failed: CAP_RED,
  yellow: CAP_YELLOW,
  orange: CAP_ORANGE,
  blue: CAP_SECONDARY.base,
  green: CAP_PRIMARY.base,
  grey: CAP_G06,
  red: CAP_RED,
  white: CAP_WHITE,
  ended: CAP_G06,
};

export const StatusColor = ({ width, height, colorType, className }) => (
  <StyledDiv
    className={className}
    width={width}
    height={height}
    color={color[colorType] || colorType}
  />
);

StatusColor.defaultProps = {
  width: CAP_SPACE_08,
  height: CAP_SPACE_08,
  colorType: '',
  className: '',
};

StatusColor.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  colorType: PropTypes.string,
};

export default StatusColor;
