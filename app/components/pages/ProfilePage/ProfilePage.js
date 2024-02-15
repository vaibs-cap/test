import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import messages from './messages';

const ProfilePage = ({ className, intl: { formatMessage } }) => {
  return (
    <div>
      <p>{formatMessage(messages.sampleHeader)}</p>
      <p>
        {formatMessage(messages.sampleCalculate, {
          xValue: 100,
          yValue: 200,
        })}
      </p>
    </div>
  );
};

ProfilePage.propTypes = {
  className: PropTypes.string,
  intl: intlShape.isRequired,
};

ProfilePage.defaultProps = {};

export default injectIntl(ProfilePage);
