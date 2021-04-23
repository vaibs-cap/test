import React from 'react';
import PropTypes from 'prop-types';

import CapIcon from '@capillarytech/cap-ui-library/CapIcon';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';

const { CAP_SPACE_32, FONT_SIZE_S } = styledVars;

export const AvatarIcon = ({ text, className, backgroundColor, textColor }) => (
  <CapIcon.CapIconAvatar
    className={className}
    text={text}
    width={CAP_SPACE_32}
    height={CAP_SPACE_32}
    backgroundProps={{
      fill: backgroundColor,
    }}
    labelProps={{
      style: {
        fontWeight: 'normal',
        fontSize: FONT_SIZE_S,
        color: textColor,
      },
    }}
  />
);

AvatarIcon.defaultProps = {
  text: '',
  className: '',
  backgroundColor: '',
  textColor: '',
};

AvatarIcon.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default AvatarIcon;
