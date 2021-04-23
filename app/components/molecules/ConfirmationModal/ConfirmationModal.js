import React from 'react';
import withStyles from 'utils/withStyles';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import CapModal from '@capillarytech/cap-ui-library/CapModal';
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapImage from '@capillarytech/cap-ui-library/CapImage';
import confirmation from '../../../assets/confirmation.png';
import globalMessages from '../../pages/Cap/messages';
import * as style from './style';

const { Flex, CapModalStyles } = style;

const CapModalWithStyles = withStyles(CapModal, CapModalStyles);

const ConfirmationModal = props => {
  const {
    isModalVisible,
    image,
    handleCancel,
    handleOk,
    title,
    description,
  } = props;

  return (
    <CapModalWithStyles
      okText={<FormattedMessage {...globalMessages.confirm} />}
      cancelText={<FormattedMessage {...globalMessages.cancel} />}
      onOk={handleOk}
      visible={isModalVisible}
      onCancel={handleCancel}
      centered
      footer={[
        <CapButton key="back" type="primary" onClick={handleCancel}>
          <FormattedMessage {...globalMessages.cancel} />
        </CapButton>,
        <CapButton key="submit" type="secondary" onClick={handleOk}>
          <FormattedMessage {...globalMessages.confirm} />
        </CapButton>,
      ]}
    >
      <Flex>
        {image && <CapImage className="modal-img" src={image} />}
        <CapHeader title={title} description={description} size="regular" />
      </Flex>
    </CapModalWithStyles>
  );
};

ConfirmationModal.defaultProps = {
  isModalVisible: false,
  image: confirmation,
  handleCancel: () => {},
  handleOk: () => {},
  title: '',
  description: '',
};

ConfirmationModal.propTypes = {
  isModalVisible: PropTypes.bool,
  image: PropTypes.string,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ConfirmationModal;
