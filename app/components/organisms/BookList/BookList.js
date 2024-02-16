import React from 'react';
import CapTable from '@capillarytech/cap-ui-library/CapTable/CapTable';
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import withStyles from 'utils/withStyles';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import mockdata from '../../pages/HomePage/mockdata';
import style from './styles';

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
    title: <CapHeader size="small" title="Button" />,
    dataIndex: 'button',
    key: 'button',
    width: '10%',

    render: (text, record) =>
      record.current_count > 0 ? (
        <CapButton size="small" color="primary" variant="contained">
          Borrow
        </CapButton>
      ) : (
        <CapButton
          className="request-btn"
          size="small"
          color="primary"
          variant="contained"
        >
          Request
        </CapButton>
      ),
  },
];

function BookList({ className }) {
  return (
    <>
      <CapRow className={className}>
        <CapTable dataSource={dataSource} columns={columns} />
      </CapRow>
    </>
  );
}

export default withStyles(BookList, style);
