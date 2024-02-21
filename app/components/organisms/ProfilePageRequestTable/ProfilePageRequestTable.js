import React from 'react';
import {
  CapTable,
  CapRow,
  CapHeading,
  CapButton,
} from '@capillarytech/cap-ui-library';
import bookData from '../../pages/ProfilePage/bookData';
import withStyles from '../../../utils/withStyles';
import styles from './styles';
import { connect } from 'react-redux';
import { cancelUserRequestedBooks } from './actions';
import injectReducer from '@capillarytech/cap-coupons/utils/injectReducer';
import profilePageRequestReducer from './reducer';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserBookRequestsData } from './selectors';
import * as actions from './actions';
import { useEffect } from 'react';
import saga from './saga';
import injectSaga from '@capillarytech/cap-coupons/utils/injectSaga';

const ProfilePageRequestTable = ({ bookRequestsData, className, actions }) => {
  useEffect(async () => {
    actions.fetchUserRequestedBooks();
  }, []);
  const userReqBooks = bookRequestsData.getBookRequests;
  console.log('state****', userReqBooks);

  const bookIds = [];
  userReqBooks.forEach(book => {
    bookIds.push({ bookId: book.book_id, reqDate: book.request_date });
  });

  const reqQueue = bookData[0].request_queue;

  const dataSource = [];

  const allBooks = bookData[0].all_books;

  bookIds.forEach(book => {
    const id = book.bookId - 1;
    dataSource.push({ request_date: book.reqDate, ...allBooks[id] });
  });

  dataSource.forEach((book, index) => {
    reqQueue.forEach(req => {
      if (req.book_id === book.book_id) {
        dataSource[index] = { ...book, waitlist_no: index + 1 };
      }
    });
  });

  const columns = [
    {
      title: <CapHeading type="h3">Book Title</CapHeading>,
      dataIndex: 'book_name',
      key: 'book_name',
      width: '15%',
    },

    {
      title: <CapHeading type="h3">Book Author</CapHeading>,
      dataIndex: 'book_author',
      key: 'book_author',
      width: '15%',
    },

    {
      title: <CapHeading type="h3">Book Genre</CapHeading>,
      dataIndex: 'book_genre',
      key: 'book_genre',
      width: '15%',
    },

    {
      title: <CapHeading type="h3">Request Date</CapHeading>,
      dataIndex: 'request_date',
      key: 'request_date',
      width: '15%',
    },

    {
      title: <CapHeading type="h3">Waitlist</CapHeading>,
      dataIndex: 'waitlist_no',
      key: 'waitlist_no',
      width: '15%',
    },

    {
      render: (text, record) => (
        <CapButton
          type="secondary"
          size="small"
          variant="contained"
          className="request-cancel-btn"
          onClick={() => {
            console.log(record);
            actions.cancelUserRequestedBooks(record.book_id);
          }}
        >
          Cancel
        </CapButton>
      ),
    },
  ];

  return (
    <CapRow className={className}>
      <CapTable dataSource={dataSource} columns={columns} className="m-30" />
    </CapRow>
  );
};

const mapStateToProps = state =>
  createStructuredSelector({
    bookRequestsData: makeSelectUserBookRequestsData(state),
  });

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'userRequest', saga });

const withReducer = injectReducer({
  key: 'userRequest',
  reducer: profilePageRequestReducer,
});

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(withStyles(ProfilePageRequestTable, styles));
