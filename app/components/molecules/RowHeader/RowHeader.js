/**
 *
 * RowHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';

import SyncLabel from '../SyncLabel';

import CustomSkeleton from '../../atoms/CustomSkeleton';

import * as style from './style';
const { Flex } = style;
const { CAP_SPACE_40 } = styledVars;

export const RowHeader = ({
  className,
  title,
  buttonText,
  showSync,
  lastSyncTime,
  lastSyncTimeError,
  showButton,
  onButtonClick,
  isButtonLoading,
}) => (
  <CapRow className={className}>
    <Flex>
      <CapHeader
        size="large"
        title={title}
        description={
          showSync && (
            <SyncLabel
              lastSyncTime={lastSyncTime}
              lastSyncTimeError={lastSyncTimeError}
            />
          )
        }
      />
      <div style={{ height: CAP_SPACE_40 }}>
        {isButtonLoading ? (
          <CustomSkeleton isTitle width="146px" />
        ) : (
          showButton && (
            <CapButton type="primary" onClick={onButtonClick}>
              {buttonText}
            </CapButton>
          )
        )}
      </div>
    </Flex>
  </CapRow>
);

RowHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  lastSyncTime: PropTypes.string,
  lastSyncTimeError: PropTypes.string,
  showSync: PropTypes.bool,
  showButton: PropTypes.bool,
  isButtonLoading: PropTypes.bool,
  onButtonClick: PropTypes.func,
};

RowHeader.defaultProps = {
  className: '',
  title: '',
  buttonText: '',
  lastSyncTime: '',
  lastSyncTimeError: '',
  showSync: false,
  showButton: false,
  isButtonLoading: false,
};

export default RowHeader;
