import React from 'react';
import { CapTable, CapButton, CapHeading } from '@capillarytech/cap-ui-library';
import bookData from '../../pages/ProfilePage/bookData';

const userReqBooks = bookData[0].users[0].requested_books;
const bookIds = [];
userReqBooks.forEach(book => {
  bookIds.push({ bookId: book.book_id, reqDate: book.request_date });
});

const dataSource = [];

const allBooks = bookData[0].all_books;

const bookDetails = [];
bookIds.forEach(book => {
  const id = book.bookId - 1;
  dataSource.push({ request_date: book.reqDate, ...allBooks[id] });
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
    dataIndex: 'count',
    key: 'count',
    width: '15%',
  },

  {
    render: (text, record) => (
      <CapButton type="secondary" size="small" variant="contained">
        Cancel
      </CapButton>
    ),
  },
];
const ProfilePageRequestTable = () => {
  const userEmail = "user1@example.com";
  const dataSource = mockdata[0].new_books_request_queue.filter((obj)=>obj.email===userEmail);
  const columns = [
    {
      title: <CapHeader size="small" title="Book ID" />,
      dataIndex: 'book_name',
      key: 'book_name',
      width: '20%',
    },
    {
      title: <CapHeader size="small" title="Book author" />,
      dataIndex: 'book_author',
      key: 'book_author',
      width: '20%',
    },
  
    {
      title: <CapHeader size="small" title="Request Date" />,
      dataIndex: 'date',
      key: 'date',
      width: '15%',
    },
  
    {
      title: <CapHeader size="small" title="Book Genre" />,
      dataIndex: 'book_genre',
      key: 'book_genre',
      width: '15%',
    },
  ];
  
  return (
    <CapTable
      dataSource={dataSource}
      id="capTable_rentedBooks"
      columns={columns}
    />
  );
};

export default ProfilePageRequestTable;
