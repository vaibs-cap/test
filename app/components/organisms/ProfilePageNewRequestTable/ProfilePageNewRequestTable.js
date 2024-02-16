import {
  CapTable,
  CapHeading,
  CapButton,
  CapRow,
} from '@capillarytech/cap-ui-library';
import React, { Fragment } from 'react';
import bookData from '../../pages/ProfilePage/bookData';

const ProfilePageNewRequestTable = () => {
  const userEmail = 'admin@example.com';
  const dataSource = bookData[0].new_books_request_queue.filter(
    obj => obj.email === userEmail,
  );
  const columns = [
    {
      title: <CapHeading type="h3">User</CapHeading>,
      dataIndex: 'email',
      key: 'email',
      width: '20%',
    },
    {
      title: <CapHeading type="h3">Book Title</CapHeading>,
      dataIndex: 'book_name',
      key: 'book_name',
      width: '20%',
    },
    {
      title: <CapHeading type="h3">Book Author</CapHeading>,
      dataIndex: 'book_author',
      key: 'book_author',
      width: '20%',
    },
    {
      title: <CapHeading type="h3">Request Date</CapHeading>,

      dataIndex: 'date',
      key: 'date',
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

  return (
    <CapRow>
      <CapTable dataSource={dataSource} columns={columns} />
    </CapRow>
  );
};

export default ProfilePageNewRequestTable;
