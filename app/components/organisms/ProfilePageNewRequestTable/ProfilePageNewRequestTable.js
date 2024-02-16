import React from 'react';
import { CapTable, CapHeader } from '@capillarytech/cap-ui-library';
import { bookdata } from '../../pages/ProfilePage/bookData';

const ProfilePageRequestTable = () => {
  const userEmail = 'admin@example.com';
  const dataSource = bookdata[0].new_books_request_queue.filter(
    obj => obj.email === userEmail,
  );
  console.log(dataSource);
  const columns = [
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
  ];

  return (
    <div>
      <CapTable dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ProfilePageRequestTable;
