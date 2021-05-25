/**
 *
 * SortIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import withStyles from 'utils/withStyles';

import CapIcon from '@capillarytech/cap-ui-library/CapIcon';

import styles from './style';
import * as globalConstants from '../../pages/Cap/constants';

const { ASCEND, DESCEND } = globalConstants;

const SortIcon = ({ sortOrder, className }) => {
  const sortIcon = (isSlected, iconName) => (
    <CapIcon
      className={classnames(
        'pointer-cursor',
        'sort-table-icon',
        `sort-table-icon-${iconName}`,
        {
          selected: isSlected,
        },
      )}
      type={iconName}
    />
  );

  return (
    <div className={classnames(className, 'sort-icon-container')}>
      {sortIcon(sortOrder === ASCEND, 'caret-up')}
      {sortIcon(sortOrder === DESCEND, 'caret-down')}
    </div>
  );
};

SortIcon.propTypes = {
  sortOrder: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  className: PropTypes.string,
};

SortIcon.defaultProps = {
  sortOrder: '',
  className: '',
};

export default withStyles(SortIcon, styles);
