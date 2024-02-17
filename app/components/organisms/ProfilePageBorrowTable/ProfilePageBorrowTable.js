import React from 'react';
import { CapHeading, CapRow, CapTable } from '@capillarytech/cap-ui-library';
import { columns } from './constants';
import bookData from '../../pages/ProfilePage/bookData';
import withStyles from '../../../utils/withStyles';
import styles from './styles';


const ProfilePageBorrowTable = ({className}) => {
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

export default withStyles(ProfilePageBorrowTable, styles);
