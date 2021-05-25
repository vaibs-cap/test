/**
 *
 * ProgramName
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import withStyles from 'utils/withStyles';

import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import CapTooltip from '@capillarytech/cap-ui-library/CapTooltip';

import Tag from '../../atoms/Tag';
import AvatarIcon from '../../atoms/AvatarIcon';

import styles from './style';

const Name = ({
  name,
  tooltip,
  showTag,
  tagProps,
  showIcon,
  titleRest,
  className,
  avatarProps,
  description,
  iconClassName,
  descClassName,
  titleClassName,
}) => (
  <CapTooltip title={tooltip}>
    <CapRow className={className}>
      <CapHeader
        size="regular"
        className="program-name-container"
        titleClass="program-name"
        title={
          <>
            <CapHeading
              type="h3"
              title={name}
              className={classnames(
                'program-name-text',
                'truncate-text',
                titleClassName,
              )}
            >
              {name}
            </CapHeading>
            {showIcon && (
              <CapIcon
                type="star"
                theme="filled"
                className={classnames('favorite-icon', iconClassName)}
              />
            )}
          </>
        }
        description={
          <CapHeading
            type="label4"
            className={classnames(
              'program-desc',
              'truncate-text',
              descClassName,
            )}
            title={description}
          >
            {description}
          </CapHeading>
        }
        prefix={<AvatarIcon className="avatar-icon" {...avatarProps} />}
        {...titleRest}
      />
      {showTag && <Tag className="custom-tag" {...tagProps} />}
    </CapRow>
  </CapTooltip>
);

Name.propTypes = {
  name: PropTypes.string,
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  showTag: PropTypes.bool,
  tagProps: PropTypes.object,
  showIcon: PropTypes.bool,
  titleRest: PropTypes.object,
  className: PropTypes.string,
  avatarProps: PropTypes.object,
  description: PropTypes.string,
  iconClassName: PropTypes.string,
  descClassName: PropTypes.string,
  titleClassName: PropTypes.string,
};

Name.defaultProps = {
  name: '',
  tooltip: '',
  showTag: false,
  tagProps: {},
  showIcon: false,
  titleRest: {},
  className: '',
  avatarProps: {},
  description: '',
  iconClassName: '',
  descClassName: '',
  titleClassName: '',
};

export default withStyles(Name, styles);
