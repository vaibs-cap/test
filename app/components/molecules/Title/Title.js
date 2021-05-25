/**
 *
 * ProgramTitle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import CapRow from '@capillarytech/cap-ui-library/CapRow';

import SortHeader from '../SortHeader';
import CustomSkeleton from '../../atoms/CustomSkeleton';

// import styled from 'styled-components';

const Title = ({
  title,
  sortOrder,
  isLoading,
  className,
  description,
  showDescSort,
  showTitleSort,
  skeletonWidth,
  skeletonHeight,
}) => (
  <CapRow className={className}>
    {isLoading ? (
      <CustomSkeleton isTitle height={skeletonHeight} width={skeletonWidth} />
    ) : (
      <SortHeader
        title={title}
        description={description}
        showTitleSort={showTitleSort}
        showDescSort={showDescSort}
        sortOrder={sortOrder}
      />
    )}
  </CapRow>
);

Title.propTypes = {
  title: PropTypes.string,
  sortOrder: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  description: PropTypes.string,
  showDescSort: PropTypes.bool,
  showTitleSort: PropTypes.bool,
  skeletonWidth: PropTypes.string,
  skeletonHeight: PropTypes.string,
};

Title.defaultProps = {
  title: '',
  sortOrder: '',
  isLoading: false,
  className: '',
  description: '',
  showDescSort: false,
  showTitleSort: false,
  skeletonWidth: '',
  skeletonHeight: '',
};

export default Title;
