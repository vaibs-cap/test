import React from 'react';
import { CapHeading, CapTable } from '@capillarytech/cap-ui-library';
import withStyles from 'utils/withStyles';
import { columns } from './constants';
import bookData from '../../pages/ProfilePage/bookData';
import { styles } from './styles';

const ProfilePageBorrowTable = () => {
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
    <>
      <CapTable columns={columns} dataSource={dataSource} />
    </>
  );
};

export default withStyles(ProfilePageBorrowTable, styles);
