import React, { useEffect, useState } from 'react';
import { CapHeading, CapRow, CapTable } from '@capillarytech/cap-ui-library';
import { columns } from './constants';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import saga from './saga';
import styles from './styles';
import withStyles from '../../../utils/withStyles';
import bookData from '../../pages/ProfilePage/bookData';
import * as actions from './actions';
import { profilePageBorrowedReducer } from './reducer';
import { makeSelectUserBorrowedBooksData } from './selectors';

const ProfilePageBorrowTable = ({
  className,
  bookBorrowedData,
  actions,}) => {
  useEffect(async () => {
    actions.fetchUserBorrowedBooks();
  }, []);
  const { issued_books } = bookData[0].users[0];
  const bookIds = [];
  const dataSource = [];
  issued_books.forEach(book => {
    bookIds.push({
      bookId: book.book_id,
      issue_date: book.issue_date,
      due_date: book.due_date,
    });
  });

  const allBooks = bookData[0].all_books;

  bookIds.forEach(book => {
    const id = book.bookId - 1;
    dataSource.push({
      request_date: book.issue_date,
      due_date: book.due_date,
      ...allBooks[id],
    });
  });

  return (
    <CapRow className={className}>
      <CapTable className="m-30" columns={columns} dataSource={dataSource} />
    </CapRow>
  );
};

const mapStateToProps = state =>
  createStructuredSelector({
    bookBorrowedData: makeSelectUserBorrowedBooksData(state),
  });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'userReturnBook', saga });
const withReducer = injectReducer({
  key: 'profilePageBorrowedReducer',
  reducer: profilePageBorrowedReducer,
});

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(withRouter(withStyles(ProfilePageBorrowTable, styles)));

