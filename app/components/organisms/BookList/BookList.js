import React from 'react';
import CapTable from '@capillarytech/cap-ui-library/CapTable/CapTable';
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
// import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapButton from '@capillarytech/cap-ui-library/CapButton';
// import { Button } from 'antd';
import mockdata from '../../pages/HomePage/mockdata';

const dataSource = mockdata[0].all_books;

const columns = [
  {
    title: <CapHeader size="small" title="Book ID" />,
    dataIndex: 'book_id',
    key: 'book_id',
    width: '15%',
  },
  {
    title: <CapHeader size="small" title="Book Name" />,
    dataIndex: 'book_name',
    key: 'book_name',
    width: '15%',
  },

  {
    title: <CapHeader size="small" title="Book Author" />,
    dataIndex: 'book_author',
    key: 'book_author',
    width: '15%',
  },

  {
    title: <CapHeader size="small" title="Book Genre" />,
    dataIndex: 'book_genre',
    key: 'book_genre',
    width: '15%',
  },

  {
    title: <CapHeader size="small" title="Count" />,
    dataIndex: 'count',
    key: 'count',
    width: '15%',
  },

  {
    title: <CapHeader size="small" title="Button" />,
    dataIndex: 'button',
    key: 'button',
    width: '10%',

    render: (text, record) =>
      record.count > 0 ? (
        <CapButton size="small" color="primary" variant="contained">
          Borrow
        </CapButton>
      ) : (
        <CapButton size="small" color="primary" variant="contained">
          Request
        </CapButton>
      ),
  },
];

function BookList() {
  return (
    <>
      <CapTable dataSource={dataSource} columns={columns} />
    </>
  );
}

export default BookList;
