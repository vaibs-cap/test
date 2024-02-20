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
import { cancelUserRequestedBooks } from './redux/actions';
import injectReducer from '@capillarytech/cap-coupons/utils/injectReducer';
import profilePageRequestReducer from './redux/reducer';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

const userReqBooks = bookData[0].users[0].requested_books;
// console.log('*******', bookData[0].users[0].requested_books);

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

const ProfilePageRequestTable = ({
  cancelUserRequestedBooks,
  userRequestedBooks,
  className,
}) => {
  console.log('****#####', userRequestedBooks);

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
            console.log('after', userRequestedBooks);
            cancelUserRequestedBooks(record.book_id);
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

const mapStateToProps = state => {
  console.log('.....', state.get('userRequestedBooks').toJS());
  return {
    userRequestedBooks: state.get('userRequestedBooks'),
  };
  // createStructuredSelector({
  //   userRequestedBooks:makeSel
  // })
};

const mapDispatchToProps = dispatch => {
  return {
    cancelUserRequestedBooks: bookId =>
      dispatch(cancelUserRequestedBooks(bookId)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'userRequest',
  reducer: profilePageRequestReducer,
});

export default compose(
  withReducer,
  withConnect,
)(withStyles(ProfilePageRequestTable, styles));
