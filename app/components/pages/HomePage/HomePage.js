import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CapRow } from '@capillarytech/cap-ui-library';
import BookList from '../../organisms/BookList/BookList';
import Filter from '../../organisms/Filter/Filter';
import { fetchBookList } from './actions';
import {
  makeAllBookListSelector,
  makeTotalBooksSelctor,
  makeLoadingState,
} from './selector';
import withStyles from '../../../utils/withStyles';
import styles from './styles';

const RECORDS_PER_PAGE = 10;

const HomePage = ({
  className,
  allBooks = [],
  totalBooks = 0,
  isLoading,
  actions,
}) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [enteredFilterValue, setEnteredFilterValue] = useState('');
  const [filterBy, selectedFilterBy] = useState(null);

  useEffect(
    () => {
      fetchBooks();
    },
    [currentPageNumber, enteredFilterValue],
  );

  function onchange(data) {
    setCurrentPageNumber(data.current);
  }

  function getFilterKey() {
    switch (filterBy) {
      case 'BY_GENRE':
        return 'genre';
      case 'BY_AUTHOR':
        return 'authorName';
      case 'BY_NAME':
        return 'bookName';
      case 'NO_FILTER':
      default:
        return '';
    }
  }

  function fetchBooks() {
    const requestPayload = {
      limit: RECORDS_PER_PAGE,
      page: currentPageNumber,
    };

    const filterKey = getFilterKey();

    if (filterBy !== '') requestPayload[filterKey] = enteredFilterValue;

    actions.fetchBookList(requestPayload);
  }

  function setFilterBy(value) {
    selectedFilterBy(value);
  }

  function onFilterValueChange(value) {
    setCurrentPageNumber(1);
    setEnteredFilterValue(value);
  }

  return (
    <CapRow className={className}>
      <CapRow className="requests-container">
        <Filter
          selectedFilterBy={filterBy}
          handleFilterByChange={setFilterBy}
          filterValue={enteredFilterValue}
          handleFilterValueChange={onFilterValueChange}
        />
        <BookList
          pagination={{
            current: currentPageNumber,
            pageSize: 10,
            total: totalBooks,
          }}
          loading={isLoading}
          onChange={onchange}
          dataSource={allBooks}
          totalBooks={totalBooks}
        />
      </CapRow>
    </CapRow>
  );
};

const mapStateToProps = createStructuredSelector({
  allBooks: makeAllBookListSelector(),
  totalBooks: makeTotalBooksSelctor(),
  isLoading: makeLoadingState(),
});

const mapDispatchToProps = dispatch => ({
  actions: {
    fetchBookList: payload => dispatch(fetchBookList(payload)),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(HomePage, styles));
