import {
  CapTable,
  CapRow,
  CapModal,
  CapHeading,
  CapButton,
  CapInput,
  CapDatePicker,
  CapAlert,
  CapForm,
} from '@capillarytech/cap-ui-library';
import React from 'react';
import { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '@capillarytech/cap-coupons/utils/injectReducer';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import saga from './saga';
import styles from './styles';
import withStyles from '../../../utils/withStyles';
import * as actions from './actions';
import { profilePageNewRequestReducer } from './reducer';
import { makeSelectUserNewBookRequestsData } from './selectors';
import moment from 'moment';
import CapFormItem from '@capillarytech/cap-ui-library';
import injectSaga from '@capillarytech/cap-coupons/utils/injectSaga';

const AdminPageNewRequestTable = ({ className, bookRequestsData, actions }) => {
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
      anticipated_date: moment(),
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
    // console.log(newReq);
    actions.acceptNewBookRequest(newReq);
    setIsAcceptModalOpen(false);
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
          Reject
        </CapButton>
      ),
      width: '7%',
    },
  ];

  // const [form]=CapForm.useForm();
  return (
    <CapRow className={className}>
      <CapTable className="m-30" dataSource={dataSource} columns={columns} />
      <CapRow className="modal">
        <CapModal
          title="Accept New Request"
          okText="Approve"
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
          <CapInput
            name="book_genre"
            label="Genre"
            value={newReq.book_genre}
            onChange={handleChange}
          />
          <CapInput
            value={newReq.book_description}
            name="book_description"
            label="Description"
            onChange={handleChange}
            rules={[{ required: true }]}
          />
          <CapDatePicker
            value={moment()}
            name="anticipated date"
            label="Anticipated Date"
            onChange={handleDate}
          />
        </CapModal>

        <CapModal
          title="Reject Request"
          okText="Reject"
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
            required
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

const withSaga = injectSaga({ key: 'profilePageNewRequest', saga });

const withReducer = injectReducer({
  key: 'profilePageNewRequest',
  reducer: profilePageNewRequestReducer,
});

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(withRouter(withStyles(AdminPageNewRequestTable, styles)));
