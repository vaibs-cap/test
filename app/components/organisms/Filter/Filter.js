import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import React from 'react';
import PropTypes from 'prop-types';
import CapCustomSelect from '@capillarytech/cap-ui-library/CapCustomSelect';
import CapInput from '@capillarytech/cap-ui-library/CapInput';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import withStyles from 'utils/withStyles';
import style from './styles';
import { FILTER_BY_OPTIONS } from './constants';

function getPlaceHolderValue(selectedFilterBy) {
  switch (selectedFilterBy) {
    case 'NO_FILTER':
      return 'Select filter by field';
    case 'BY_GENRE':
      return 'Search by book genre...';
    case 'BY_AUTHOR':
      return 'Search by author name...';
    case 'BY_NAME':
      return 'Search by book name...';
  }
}

const Filter = ({
  className,
  selectedFilterBy,
  filterValue,
  handleFilterByChange,
  handleFilterValueChange,
}) => (
  <CapRow className={className}>
    <CapRow className="filter-container">
      <CapHeader
        title="Capillary Library"
        description="Issue books from Capillary Library"
      />
      <CapHeading class="filter-heading" type="h3">
        Filter Books
      </CapHeading>
      <CapRow className="filter-by-container">
        <CapCustomSelect
          width="28rem"
          selectPlaceholder="Filter by:"
          value={selectedFilterBy ? selectedFilterBy : ''}
          onChange={val => handleFilterByChange(val)}
          options={[...FILTER_BY_OPTIONS]}
        />

        <CapInput
          className="book-filter-field"
          value={filterValue}
          disabled={selectedFilterBy === 'NO_FILTER'}
          onChange={event => handleFilterValueChange(event.target.value)}
          placeholder={getPlaceHolderValue(selectedFilterBy)}
        />
      </CapRow>
    </CapRow>
  </CapRow>
);

Filter.propTypes = {
  className: PropTypes.string,
  selectedFilterBy: PropTypes.func,
  filterValue: PropTypes.string,
  handleFilterByChange: PropTypes.func,
  handleFilterValueChange: PropTypes.func,
};

export default withStyles(Filter, style);
