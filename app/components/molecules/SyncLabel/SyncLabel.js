/**
 *
 * SyncLabel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import withStyles from 'utils/withStyles';

import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';
import CapLabel from '@capillarytech/cap-ui-library/CapLabel';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import messages from './messages';
import styles from './style';

export const SyncLabel = ({ className, lastSyncTime, lastSyncTimeError }) => (
  <CapRow className={classnames('align-items-center', className)}>
    {!lastSyncTimeError && (
      <>
        <CapIcon className="sync-icon" type="sync" />
        <CapLabel.CapLabelInline type="label1">
          {lastSyncTime ? (
            moment(lastSyncTime).fromNow()
          ) : (
            <>
              <FormattedMessage {...messages.processing} />
              {`..`}
            </>
          )}
        </CapLabel.CapLabelInline>
      </>
    )}
  </CapRow>
);

SyncLabel.defaultProps = {
  className: '',
  lastSyncTime: '',
  lastSyncTimeError: '',
};

SyncLabel.propTypes = {
  className: PropTypes.string,
  lastSyncTime: PropTypes.string,
  lastSyncTimeError: PropTypes.string,
};

export default withStyles(SyncLabel, styles);
