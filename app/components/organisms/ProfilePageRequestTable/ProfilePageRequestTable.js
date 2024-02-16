import React, { Fragment } from 'react';
import {
  CapTable,
  CapButton,
  CapHeading,
  CapRow,
} from '@capillarytech/cap-ui-library';
import bookData from '../../pages/ProfilePage/bookData';
import withStyles from '../../../utils/withStyles';
// import styles from '../../pages/ProfilePage/style';
import styles from './styles';

const userReqBooks = bookData[0].users[0].requested_books;
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
      // req.request_users.forEach((email)=>{
      //   if(book.users[0].email===email){
      //     dataSource
      //   }
      // })
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
      >
        Cancel
      </CapButton>
    ),
  },
];
const ProfilePageRequestTable = ({ className }) => {
  return (
    <CapRow className={className}>
      <CapTable
        dataSource={dataSource}
        id="capTable_rentedBooks"
        columns={columns}
      />
    </CapRow>
  );
};

export default withStyles(ProfilePageRequestTable, styles);
