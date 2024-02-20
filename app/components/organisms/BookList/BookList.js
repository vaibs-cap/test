import React, { useState } from 'react';
import CapTable from '@capillarytech/cap-ui-library/CapTable/CapTable';
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import withStyles from 'utils/withStyles';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import style from './styles';
import { issueBook, cancelIssueBook } from '../../pages/HomePage/actions';
import {
  makeAllBookListSelector,
  makeTotalBooksSelctor,
  makeLoadingState,
} from '../../pages/HomePage/selector';

let issued_books_array = [];
const BookList = ({
  className,
  dataSource,
  loading,
  pagination,
  onChange,
  actions,
}) => {
  const [issuedBooksArray, setIssuedBooksArray] = useState([]);
  function issueOnClick(data) {
    setIssuedBooksArray(prevArray => [...prevArray, data.book_id]);
    console.log('This is issued array', issued_books_array);
    const requestPayload = {
      book_id: data.book_id,
    };
    actions.issueBook(requestPayload);
  }

  function cancelOnClick(bookId) {
    setIssuedBooksArray(prevArray => prevArray.filter(id => id !== bookId));
    const requestPayload = {
      book_id: bookId,
    };
    actions.cancelIssueBook(requestPayload);
  }
  const columns = [
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
      title: <CapHeader size="small" title="Available Count" />,
      dataIndex: 'current_count',
      key: 'current_count',
      width: '15%',
    },

    {
      title: <CapHeader size="small" title="Button" />,
      dataIndex: 'button',
      key: 'button',
      width: '10%',

      render: (text, record) => {
        if (
          record.current_count > 0 &&
          !issuedBooksArray.includes(record.book_id)
        ) {
          return (
            <CapButton
              size="small"
              color="primary"
              variant="contained"
              onClick={() => issueOnClick(record)}
            >
              Get Book
            </CapButton>
          );
        } else if (
          record.current_count > 0 &&
          issuedBooksArray.includes(record.book_id)
        ) {
          return (
            <CapButton
              size="small"
              color="primary"
              variant="contained"
              className="cancel-btn"
              onClick={() => cancelOnClick(record.book_id)}
            >
              Cancel
            </CapButton>
          );
        } else {
          return (
            <CapButton
              className="request-btn"
              size="small"
              color="primary"
              variant="contained"
            >
              Reserve
            </CapButton>
          );
        }
      },
    },
  ];

  return (
    <>
      <CapRow className={className}>
        <CapTable
          loading={loading}
          onChange={data => onChange(data)}
          pagination={pagination}
          dataSource={dataSource}
          columns={columns}
        />
      </CapRow>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  allBooks: makeAllBookListSelector(),
  totalBooks: makeTotalBooksSelctor(),
  isLoading: makeLoadingState(),
});

const mapDispatchToProps = dispatch => ({
  actions: {
    issueBook: payload => dispatch(issueBook(payload)),
    cancelIssueBook: payload => dispatch(cancelIssueBook(payload)),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(BookList, style));
