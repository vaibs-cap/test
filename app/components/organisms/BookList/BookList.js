import React from 'react';
import CapTable from '@capillarytech/cap-ui-library/CapTable/CapTable';
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import withStyles from 'utils/withStyles';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import style from './styles';
import { issueBook } from '../../pages/HomePage/actions';
import {
  makeAllBookListSelector,
  makeTotalBooksSelctor,
  makeLoadingState,
} from '../../pages/HomePage/selector';

let toggleFlag = false;

const BookList = ({
  className,
  dataSource,
  loading,
  pagination,
  onChange,
  actions,
}) => {
  function issueOnClick(data) {
    // toggleFlag = true;
    const requestPayload = {
      book_id: data.book_id,
    };

    actions.issueBook(requestPayload);
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
        if (record.current_count > 0 && toggleFlag === false) {
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
        } else if (record.current_count > 0 && toggleFlag === true) {
          return (
            <CapButton
              size="small"
              color="primary"
              variant="contained"
              onClick={() => issueOnClick(record)}
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
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(BookList, style));
