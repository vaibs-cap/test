import { CapInput, CapModal } from '@capillarytech/cap-ui-library';
import React, { useState } from 'react';

const RejectModal = () => {
  const [reason, setReason] = useState('');

  const showCancelModal = id => {
    setReason(prevFormData => ({
      ...prevFormData,
      request_id: id,
    }));
    setIsCancelModalOpen(true);
  };

  const handleCancelChange = event => {
    const { name, value } = event.target;
    setReason(prev => ({ ...prev, [name]: value }));
  };

  const handleCancelModalAdd = () => {
    setIsCancelModalOpen(false);
    actions.cancelUserNewRequestedBooks(reason);
  };

  const handleCancelModalCancel = () => {
    setIsCancelModalOpen(false);
  };

  return (
    <CapModal
      title="Cancel Request"
      okText="Cancel"
      closeText="back"
      visible={isCancelModalOpen}
      onOk={handleCancelModalAdd}
      onCancel={handleCancelModalCancel}
      width={700}
    >
      <CapInput name="reason" label="Reason" onChange={handleCancelChange} />
    </CapModal>
  );
};

export default RejectModal;
