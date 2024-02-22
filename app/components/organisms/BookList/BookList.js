import React, { useState, useEffect } from 'react';
import CapTable from '@capillarytech/cap-ui-library/CapTable/CapTable';
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import withStyles from 'utils/withStyles';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import style from './styles';
import {
  issueBook,
  cancelIssueBook,
  reserveBook,
} from '../../pages/HomePage/actions';
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
  const [issuedBooksArray, setIssuedBooksArray] = useState(() => {
    const storedBooks = localStorage.getItem('issuedBooksArray');
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  useEffect(
    () => {
      localStorage.setItem(
        'issuedBooksArray',
        JSON.stringify(issuedBooksArray),
      );
    },
    [issuedBooksArray],
  );
  function issueOnClick(data, userId = '132') {
    setIssuedBooksArray(prevArray => [...prevArray, data.book_id]);
    console.log('This is issued array', issued_books_array);
    const requestPayload = {
      book_id: data._id,
      user_id: userId,
    };
    actions.issueBook(requestPayload);
  }

  function reserveOnClick(bookId, userId = '132') {
    const requestPayload = {
      book_id: bookId,
      user_id: userId,
    };
    actions.reserveBook(requestPayload);
  }

  const columns = [
    {
      title: <CapHeading type="h4">Book Name</CapHeading>,
      dataIndex: 'book_name',
      key: 'book_name',
      width: '15%',
    },

    {
      title: <CapHeading type="h4">Book Author</CapHeading>,
      dataIndex: 'book_author',
      key: 'book_author',
      width: '15%',
    },

    {
      title: <CapHeading type="h4">Book Genre</CapHeading>,
      dataIndex: 'book_genre',
      key: 'book_genre',
      width: '15%',
    },

    {
      title: <CapHeading type="h4">Available Book/Total Book</CapHeading>,
      dataIndex: 'count_ratio',
      key: 'count_ratio',
      width: '15%',
      render: (text, record) => {
        const countRatio = record.current_count + '/' + record.total_count;
        return <span>{countRatio}</span>;
      },
    },

    {
      title: <CapHeading type="h4">Button</CapHeading>,
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
          // return (
          //   <CapButton
          //     size="small"
          //     color="primary"
          //     variant="contained"
          //     className="cancel-btn"
          //     onClick={() => cancelOnClick(record.book_id)}
          //   >
          //     Cancel
          //   </CapButton>
          // );
        } else {
          return (
            <CapButton
              className="request-btn"
              size="small"
              color="primary"
              variant="contained"
              onClick={() => reserveOnClick(record._id)}
            >
              Reserve
            </CapButton>
          );
        }
      },
    },
  ];

  return (
    <CapRow className="table">
      <CapTable
        loading={loading}
        onChange={data => onChange(data)}
        pagination={pagination}
        dataSource={dataSource}
        columns={columns}
      />
    </CapRow>
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
    reserveBook: payload => dispatch(reserveBook(payload)),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(BookList, style));
