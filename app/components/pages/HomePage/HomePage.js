import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BookList from '../../organisms/BookList/BookList';
import Filter from '../../organisms/Filter/Filter';
import { fetchBookList } from './actions';
import {
  makeAllBookListSelector,
  makeTotalBooksSelctor,
  makeLoadingState,
} from './selector';

const RECORDS_PER_PAGE = 10;

const HomePage = ({ allBooks = [], totalBooks = 0, isLoading, actions }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [authorNameFilter, setAuthorNameFiler] = useState(null);
  const [genreFilter, setGenreFilter] = useState(null);
  const [enteredBookName, setEnteredBookName] = useState('');
  const [filterBy, selectedFilterBy] = useState(null);

  useEffect(
    () => {
      fetchBooks();
    },
    [currentPageNumber, genreFilter, authorNameFilter, enteredBookName],
  );

  function onchange(data) {
    setCurrentPageNumber(data.current);
  }

  function fetchBooks() {
    const requestPayload = {
      limit: RECORDS_PER_PAGE,
      page: currentPageNumber,
      authorName: authorNameFilter,
      genre: genreFilter,
      bookName: enteredBookName,
    };

    actions.fetchBookList(requestPayload);
  }

  function setFilterBy(value) {
    if (value == 'NO_FILTER') resetAllFilterFieldValues();
    selectedFilterBy(value);
  }

  function filterByGenre(value) {
    resetAllFilterFieldValues();
    setGenreFilter(value);
  }

  function filterByAuthor(value) {
    resetAllFilterFieldValues();
    setAuthorNameFiler(value);
  }

  function onBookNameChange(value) {
    resetAllFilterFieldValues();
    setEnteredBookName(value);
  }

  function resetAllFilterFieldValues() {
    setCurrentPageNumber(1);
    setAuthorNameFiler(null);
    setGenreFilter(null);
    setEnteredBookName('');
  }

  return (
    <>
      <Filter
        selectedGenre={genreFilter}
        selectedAuthor={authorNameFilter}
        selectedFilterBy={filterBy}
        enteredBookName={enteredBookName}
        handleBookNameChange={onBookNameChange}
        handleFilterByChange={setFilterBy}
        handleGenreChange={filterByGenre}
        handleAuthorChange={filterByAuthor}
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
    </>
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
)(HomePage);
