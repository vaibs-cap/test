/**
 *
 * SortHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import SortIcon from '../../atoms/SortIcon';

const SortHeader = ({
  title,
  description,
  showTitleSort,
  showDescSort,
  sortOrder,
}) => (
  <CapHeader
    size="small"
    titleClass="align-items-center"
    descriptionClass="align-items-center"
    title={
      <>
        {title}
        {showTitleSort && <SortIcon sortOrder={sortOrder} />}
      </>
    }
    description={
      <>
        {description}
        {showDescSort && <SortIcon sortOrder={sortOrder} />}
      </>
    }
  />
);

SortHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  showTitleSort: PropTypes.bool,
  showDescSort: PropTypes.bool,
  sortOrder: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

SortHeader.defaultProps = {
  title: '',
  description: '',
  showTitleSort: false,
  showDescSort: false,
  sortOrder: '',
};

export default SortHeader;
