import React from 'react';
import { CapTable, CapHeader, CapHeading, CapButton } from '@capillarytech/cap-ui-library';
import bookData from '../../pages/ProfilePage/bookData';

const ProfilePageNewRequestTable = () => {
  const userEmail = 'admin@example.com';
  const dataSource = bookData[0].new_books_request_queue.filter(
    obj => obj.email === userEmail,
  );
  console.log(dataSource);
  const columns = [
    {
      title: <CapHeader size="small" title="User" />,
      dataIndex: 'email',
      key: 'email',
      width: '20%',
    },
    {
      title: <CapHeader size="small" title="Book name" />,
      dataIndex: 'book_name',
      key: 'book_name',
      width: '20%',
    },
    {
      title: <CapHeader size="small" title="Book Author" />,
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
      render: (text, record) => (
        <CapButton type="secondary" size="small" variant="contained">
          Cancel
        </CapButton>
      ),
    },
  ];

  return (
    <div>
      <CapHeading type="h1">New Requests</CapHeading>
      <CapTable dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ProfilePageNewRequestTable;
