/**
 * Tag
 */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'utils/withStyles';

import CapTag from '@capillarytech/cap-ui-library/CapTag';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';
import styles from './style';

const { CAP_SPACE_16 } = styledVars;

export const Tag = ({
  className,
  height,
  background,
  font,
  borderadius,
  tagText,
  width,
  ...rest
}) =>
  tagText && (
    <CapTag
      className={className}
      height={height}
      background={background}
      font={font}
      borderadius={borderadius}
      {...rest}
      style={{
        textOverflow: 'ellipsis',
        maxWidth: width,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }}
    >
      {tagText}
    </CapTag>
  );

Tag.defaultProps = {
  className: '',
  height: '18px', // Need to change 18px from ui libaray only value added on it
  background: '',
  font: '',
  tagText: '',
  borderadius: CAP_SPACE_16,
};

Tag.propTypes = {
  className: PropTypes.string,
  height: PropTypes.string,
  background: PropTypes.string,
  font: PropTypes.string,
  tagText: PropTypes.string,
  borderadius: PropTypes.string,
  width: PropTypes.string,
};

export default withStyles(Tag, styles);
