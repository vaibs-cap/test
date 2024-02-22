import {
  CapDatePicker,
  CapInput,
  CapModal,
} from '@capillarytech/cap-ui-library';
import moment from 'moment';
import React, { useState } from 'react';

const AcceptModal = () => {
  const [newReq, setNewReq] = useState({});

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

  function handleDate(date, dateString) {
    setNewReq(prevFormData => ({
      ...prevFormData,
      anticipated_date: dateString,
    }));
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setNewReq(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAcceptModalAdd = () => {
    // console.log(newReq);
    actions.acceptNewBookRequest(newReq);
    setIsAcceptModalOpen(false);
  };

  const handleAcceptModalCancel = () => {
    setIsAcceptModalOpen(false);
  };

  return (
    <CapModal
      title="Accept New Request"
      okText="Add"
      closeText="back"
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
      />
      <CapDatePicker
        value={moment()}
        name="anticipated date"
        label="Anticipated Date"
        onChange={handleDate}
      />
    </CapModal>
  );
};

export default AcceptModal;
