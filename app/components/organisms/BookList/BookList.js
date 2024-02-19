import React from 'react';
import CapTable from '@capillarytech/cap-ui-library/CapTable/CapTable';
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import withStyles from 'utils/withStyles';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import style from './styles';
import bookListReducer from '../../pages/HomePage/reducer';
import { getBook } from '../../pages/HomePage/actions';

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

    render: (text, record) =>
      record.current_count > 0 ? (
        <CapButton size="small" color="primary" variant="contained">
          Get Book
        </CapButton>
      ) : (
        <CapButton
          className="request-btn"
          size="small"
          color="primary"
          variant="contained"
        >
          Reserve
        </CapButton>
      ),
  },
];

function BookList({ className, dataSource, loading, pagination, onChange }) {
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
}

// const mapDispatchToProps = dispatch => ({
//   getBook: bookId => dispatch(getBook(bookId)),
// });

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getBook }, dispatch),
  };
}

// function mapStateToProps() {

// }
export default withStyles(BookList, style);
