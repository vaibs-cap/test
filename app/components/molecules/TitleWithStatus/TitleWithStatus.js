/**
 *
 * TitleWithStatus
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';

import Status from '../Status';

const TitleWithStatus = ({
  className,
  title,
  type,
  description,
  showStatus,
  statusType,
}) => (
  <CapRow className={className}>
    <CapHeader
      title={
        <CapHeading
          type={(type && type) || 'h5'}
          className="truncate-text"
          title={title}
        >
          {title}
        </CapHeading>
      }
      description={description}
    />
    {showStatus && <Status type={statusType} />}
  </CapRow>
);

TitleWithStatus.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  statusType: PropTypes.string,
  showStatus: PropTypes.bool,
};

TitleWithStatus.defaultProps = {
  className: '',
  title: '',
  type: '',
  description: '',
  statusType: '',
  showStatus: false,
};

export default TitleWithStatus;
