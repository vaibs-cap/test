import {
  CapTable,
  CapRow,
  CapModal,
  CapHeading,
  CapButton,
  CapInput,
  CapDatePicker,
} from '@capillarytech/cap-ui-library';
import React from 'react';
import { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import saga from './saga';
import styles from './styles';
import withStyles from '../../../utils/withStyles';
import bookData from '../../pages/ProfilePage/bookData';
import * as actions from './actions';
import { profilePageNewRequestReducer } from './reducer';
import { makeSelectUserNewBookRequestsData } from './selectors';

const ProfilePageNewRequestTable = ({
  className,
  bookRequestsData,
  actions,
}) => {
  useEffect(async () => {
    actions.fetchUserNewRequestedBooks();
  }, []);

  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const dataSource = bookRequestsData.getBookRequests;
  const [newReq, setNewReq] = useState({});
  const [reason, setReason] = useState({});

  const handleCancelChange = event => {
    const { name, value } = event.target;
    setReason(prev => ({ ...prev, [name]: value }));
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setNewReq(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function handleDate(date, dateString) {
    setNewReq(prevFormData => ({
      ...prevFormData,
      anticipated_date: dateString,
    }));
  }

  const showAcceptModal = id => {
    const tempRow = dataSource.find(obj => obj?.request_id === id);
    setNewReq(prevFormData => ({
      ...prevFormData,
      request_id: id,
      book_name: tempRow.book_name,
      book_author: tempRow.book_author,
      book_genre: '',
      book_description: '',
      anticipated_date: '',
    }));
    setIsAcceptModalOpen(true);
  };

  const showCancelModal = id => {
    setReason(prevFormData => ({
      ...prevFormData,
      request_id: id,
    }));
    setIsCancelModalOpen(true);
  };

  const handleAcceptModalAdd = () => {
    setIsAcceptModalOpen(false);
    actions.acceptNewBookRequest(newReq);
    // console.log(newReq);
  };

  const handleAcceptModalCancel = () => {
    setIsAcceptModalOpen(false);
  };

  const handleCancelModalAdd = () => {
    setIsCancelModalOpen(false);
    actions.cancelUserNewRequestedBooks(reason);
  };

  const handleCancelModalCancel = () => {
    setIsCancelModalOpen(false);
  };

  const columns = [
    {
      title: <CapHeading type="h3">User</CapHeading>,
      dataIndex: 'email',
      key: 'email',
      width: '15%',
    },
    {
      title: <CapHeading type="h3">Book Title</CapHeading>,
      dataIndex: 'book_name',
      key: 'book_name',
      width: '15%',
    },
    {
      title: <CapHeading type="h3">Book Author</CapHeading>,
      dataIndex: 'book_author',
      key: 'book_author',
      width: '15%',
    },
    {
      title: <CapHeading type="h3">Request Date</CapHeading>,

      dataIndex: 'date',
      key: 'date',
      width: '15%',
    },
    {
      render: (text, record) => (
        <CapButton
          type="secondary"
          size="small"
          variant="contained"
          onClick={() => showAcceptModal(text.request_id)}
        >
          Approve
        </CapButton>
      ),
      width: '7%',
    },
    {
      render: (text, record) => (
        <CapButton
          className="request-cancel-btn"
          type="secondary"
          size="small"
          variant="contained"
          onClick={() => showCancelModal(text.request_id)}
        >
          Cancel
        </CapButton>
      ),
      width: '7%',
    },
  ];
  return (
    <CapRow className={className}>
      <CapTable className="m-30" dataSource={dataSource} columns={columns} />
      <CapRow className="modal">
        <CapModal
          title="Accept New Request"
          okText="Add"
          closeText="cancel"
          visible={isAcceptModalOpen}
          onOk={handleAcceptModalAdd}
          onCancel={handleAcceptModalCancel}
          width={700}
        >
          <CapInput
            value={newReq.book_name}
            name="book_name"
            label="Title"
            onChange={handleChange}
          />
          <CapInput
            value={newReq.book_author}
            name="book_author"
            label="Author"
            onChange={handleChange}
          />
          <CapInput name="book_genre" label="Genre" onChange={handleChange} />
          <CapInput
            name="book_description"
            label="Description"
            onChange={handleChange}
          />
          <CapDatePicker
            name="anticipated date"
            label="Ancipated Date"
            onChange={handleDate}
          />
        </CapModal>

        <CapModal
          title="Cancel Request"
          okText="Cancel"
          closeText="back"
          visible={isCancelModalOpen}
          onOk={handleCancelModalAdd}
          onCancel={handleCancelModalCancel}
          width={700}
        >
          <CapInput
            name="reason"
            label="Reason"
            onChange={handleCancelChange}
          />
        </CapModal>
      </CapRow>
    </CapRow>
  );
};

const mapStateToProps = state =>
  createStructuredSelector({
    bookRequestsData: makeSelectUserNewBookRequestsData(state),
  });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'userNewBookRequests', saga });
const withReducer = injectReducer({
  key: 'profilePageNewRequest',
  reducer: profilePageNewRequestReducer,
});

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(withRouter(withStyles(ProfilePageNewRequestTable, styles)));
