import React from 'react'
import mockdata from '../../pages/ProfilePage/bookData'
import { CapTable,CapHeader } from '@capillarytech/cap-ui-library';


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
    <div>
      <CapTable dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default ProfilePageRequestTable