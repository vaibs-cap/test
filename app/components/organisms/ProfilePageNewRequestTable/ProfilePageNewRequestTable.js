import React, { Fragment } from 'react';
import { CapTable, CapHeading } from '@capillarytech/cap-ui-library';
import bookData from '../../pages/ProfilePage/bookData';

const ProfilePageNewRequestTable = () => {
  const userEmail = 'admin@example.com';
  const dataSource = bookData[0].new_books_request_queue.filter(
    obj => obj.email === userEmail,
  );
  console.log(dataSource);
  const columns = [
    {
      title: <CapHeading type="h3">Book Name</CapHeading>,
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
  ];

  return (
    <Fragment>
      <CapHeading type="h1">New Requests</CapHeading>
      <CapTable dataSource={dataSource} columns={columns} />
    </Fragment>
  );
};

export default ProfilePageNewRequestTable;
