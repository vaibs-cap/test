import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import messages from './messages';

const ProfilePage = ({ className, intl: { formatMessage } }) => {
  return <div>{formatMessage(messages.sampleHeader)}</div>;
};

ProfilePage.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
};

ProfilePage.defaultProps = {};

export default injectIntl(ProfilePage);
