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

const HomePage = ({ allBooks = [], totalBooks = 0, isLoading, actions }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [authorNameFilter, setAuthorNameFiler] = useState(null);
  const [genreFilter, setGenreFilter] = useState(null);

  useEffect(
    () => {
      fetchBooks();
    },
    [currentPageNumber, genreFilter, authorNameFilter],
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
    };

    actions.fetchBookList(requestPayload);
  }

  function filterByGenre(value) {
    setCurrentPageNumber(1);
    setGenreFilter(value);
  }

  function filterByAuthor(value) {
    setCurrentPageNumber(1);
    setAuthorNameFiler(value);
  }

  return (
    <>
      <Filter
        selectedGenre={genreFilter}
        selectedAuthor={authorNameFilter}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
