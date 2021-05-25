/**
 *
 * ProgramValueSkeleton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import withStyles from 'utils/withStyles';

import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import CustomSkeleton from '../../atoms/CustomSkeleton';

import styles from './style';

// import styled from 'styled-components';

const ValueSkeleton = ({
  className,
  titleWidth,
  titleHeight,
  descWidth,
  descHeight,
  showAvatar,
  avatarWidth,
  avatarHeight,
  showDescription,
  avatarClassName,
  avatarBorderRadius,
}) => (
  <CapRow className={className}>
    <CapHeader
      title={<CustomSkeleton isTitle width={titleWidth} height={titleHeight} />}
      description={
        showDescription && (
          <CustomSkeleton isTitle width={descWidth} height={descHeight} />
        )
      }
      prefix={
        showAvatar && (
          <CustomSkeleton
            isTitle
            width={avatarWidth}
            height={avatarHeight}
            borderRadius={avatarBorderRadius}
            className={classnames('avatar-icon', avatarClassName)}
          />
        )
      }
    />
  </CapRow>
);

ValueSkeleton.propTypes = {
  className: PropTypes.string,
  titleWidth: PropTypes.string,
  titleHeight: PropTypes.string,
  descWidth: PropTypes.string,
  descHeight: PropTypes.string,
  showAvatar: PropTypes.bool,
  avatarWidth: PropTypes.string,
  avatarHeight: PropTypes.string,
  showDescription: PropTypes.bool,
  avatarClassName: PropTypes.string,
  avatarBorderRadius: PropTypes.string,
};

ValueSkeleton.defaultProps = {
  className: '',
  titleWidth: '',
  titleHeight: '',
  descWidth: '',
  descHeight: '',
  showAvatar: false,
  avatarWidth: '',
  avatarHeight: '',
  showDescription: false,
  avatarClassName: '',
  avatarBorderRadius: '',
};

export default withStyles(ValueSkeleton, styles);
