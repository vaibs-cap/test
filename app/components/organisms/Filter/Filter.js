import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import React from 'react';
import PropTypes from 'prop-types';
import CapCustomSelect from '@capillarytech/cap-ui-library/CapCustomSelect';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import withStyles from 'utils/withStyles';
import style from './styles';
import { GENRE_FILTER_OPTIONS, AUTHOR_FILTER_OPTIONS } from './constants';

const Filter = ({
  className,
  selectedGenre,
  selectedAuthor,
  handleGenreChange,
  handleAuthorChange,
}) => (
  <CapRow className={className}>
    <CapRow className="filter-container">
      <CapHeader
        title="Capillary Library"
        description="Issue books from Capillary Library"
      />
      <CapHeading type="h3">Filter Books</CapHeading>
      <CapRow className="filter-books-search-container">
        <CapCustomSelect
          width="28rem"
          className="select-genere-search-input"
          showSearch
          selectPlaceholder="Select Genre"
          value={selectedGenre ? selectedGenre : ''}
          onChange={val => handleGenreChange(val)}
          options={[
            { label: 'All Genres', value: '' },
            ...GENRE_FILTER_OPTIONS,
          ]}
        />
        <CapCustomSelect
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
      </CapRow>
    </CapRow>
  </CapRow>
);

Filter.propTypes = {
  className: PropTypes.string,
  selectedGenre: PropTypes.string,
  selectedAuthor: PropTypes.string,
  handleGenreChange: PropTypes.func,
  handleAuthorChange: PropTypes.func,
};

export default withStyles(Filter, style);
