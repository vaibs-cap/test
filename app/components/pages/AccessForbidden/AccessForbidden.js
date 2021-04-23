import React from 'react';
import { FormattedMessage } from 'react-intl';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import withStyles from 'utils/withStyles';
import messages from './messages';
import styles from './style';

const AccessForbidden = ({ className }) => (
  <CapRow className={className}>
    <CapHeading type="h2">
      <FormattedMessage {...messages.forbiddenHeader} />
    </CapHeading>
    <CapHeading type="h3">
      <FormattedMessage {...messages.forbiddenDesc} />
    </CapHeading>
  </CapRow>
);

export default withStyles(AccessForbidden, styles);
