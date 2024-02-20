import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import React from 'react';
import PropTypes from 'prop-types';
import CapCustomSelect from '@capillarytech/cap-ui-library/CapCustomSelect';
import CapInput from '@capillarytech/cap-ui-library/CapInput';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import withStyles from 'utils/withStyles';
import style from './styles';
import {
  GENRE_FILTER_OPTIONS,
  AUTHOR_FILTER_OPTIONS,
  FILTER_BY_OPTIONS,
} from './constants';

const Filter = ({
  className,
  selectedGenre,
  selectedAuthor,
  selectedFilterBy,
  enteredBookName,
  handleFilterByChange,
  handleGenreChange,
  handleAuthorChange,
  handleBookNameChange,
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
      </CapRow>
      {selectedFilterBy !== 'NO_FILTER' && (
        <CapRow className="filter-books-search-container">
          {(selectedFilterBy === 'BY_GENRE' ||
            selectedFilterBy === 'ALL_FILTERS') && (
            <CapCustomSelect
              width="28rem"
              className="book-filter-field"
              showSearch
              selectPlaceholder="Select Genre"
              value={selectedGenre ? selectedGenre : ''}
              onChange={val => handleGenreChange(val)}
              options={[
                { label: 'All Genres', value: '' },
                ...GENRE_FILTER_OPTIONS,
              ]}
            />
          )}
          {(selectedFilterBy === 'BY_AUTHOR' ||
            selectedFilterBy === 'ALL_FILTERS') && (
            <CapCustomSelect
              className="book-filter-field"
              width="28rem"
              showSearch
              selectPlaceholder="Select Author"
              value={selectedAuthor ? selectedAuthor : ''}
              onChange={val => handleAuthorChange(val)}
              options={[
                { label: 'All Authors', value: '' },
                ...AUTHOR_FILTER_OPTIONS,
              ]}
            />
          )}

          {(selectedFilterBy === 'BY_NAME' ||
            selectedFilterBy === 'ALL_FILTERS') && (
            <CapInput
              className="book-filter-field"
              value={enteredBookName}
              onChange={event => handleBookNameChange(event.target.value)}
              placeholder="Search by book name..."
            />
          )}
        </CapRow>
      )}
    </CapRow>
  </CapRow>
);

Filter.propTypes = {
  className: PropTypes.string,
  selectedGenre: PropTypes.string,
  selectedAuthor: PropTypes.string,
  handleGenreChange: PropTypes.func,
  handleAuthorChange: PropTypes.func,
  selectedFilterBy: PropTypes.func,
  enteredBookName: PropTypes.string,
  handleFilterByChange: PropTypes.func,
  handleBookNameChange: PropTypes.func,
};

export default withStyles(Filter, style);
