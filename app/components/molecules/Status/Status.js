import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CapLabel from '@capillarytech/cap-ui-library/CapLabel';
import withStyles from 'utils/withStyles';
import * as style from './style';
import messages from './messages';
import Tag from '../../atoms/Tag';
import * as constants from './constants';

const { LIVE, ENDED, INPROGRESS, INVALID, TAG, YELLOW } = constants;
const { StatusIcon } = style;
const { CapLabelInline } = CapLabel;

const getType = type => {
  switch (type) {
    case LIVE:
    case ENDED:
      return type;
    case INPROGRESS:
      return YELLOW;
    default:
      return INVALID;
  }
};

export const Status = ({ type, spacing, mode, tagProps, ...rest }) => {
  const statusType = getType(type);
  return (
    <>
      <StatusIcon spacing={spacing} colorType={statusType} {...rest} />
      {mode === TAG ? (
        <Tag {...tagProps} />
      ) : (
        <CapLabelInline type="label2">
          <FormattedMessage {...messages[statusType]} />
        </CapLabelInline>
      )}
    </>
  );
};

Status.defaultProps = {
  type: '',
  mode: '',
  spacing: '',
  tagProps: {},
};

Status.propTypes = {
  type: PropTypes.string,
  mode: PropTypes.string,
  spacing: PropTypes.string,
  tagProps: PropTypes.object,
};

export default withStyles(Status);
