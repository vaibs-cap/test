import React, { useEffect, useState } from 'react';
import withStyles from '../../utils/withStyles';
import history from 'utils/history';

import CapInput from '@capillarytech/cap-ui-library/CapInput';
import CapColumn from '@capillarytech/cap-ui-library/CapColumn';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import CapNotification from '@capillarytech/cap-ui-library/CapNotification';

import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import * as types from './constants';
import saga from './saga';
import reducer from './reducer';

import { styles } from './style';
import './style.css';
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import {
  makeSelectNewProductDetails,
  makeSelectProductStatus,
} from './selectors';
import { blankForm } from './constants';
import { FormattedMessage, injectIntl,intlShape } from 'react-intl';

export const ProductAdd = ({ actions, newProductDetails, status,intl }) => {

  const [formData, setFormData] = useState(blankForm);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleFormChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const clearForm = () => {
    setFormData(blankForm);
  };

  const openSuccessNotification = () => {
    CapNotification.success({
      message: 'New Product Added Successfully',
      onClick: () => {},
      duration: 0,
    });
  };

  const openErrorNotification = () => {
    CapNotification.error({
      message: 'There was an Error! Try Again',
      onClick: () => {},
      duration: 0,
    });
  };

  const goHome = () => {
    history.push('/product');
  };
  useEffect(() => setButtonDisabled(!Object.values(formData).every(Boolean)), [
    formData,
  ]);

  useEffect(
    () => {
      if (status == 'success') {
        clearForm();
        openSuccessNotification();
        actions.resetProductStatus();
      } else if (status == 'failure') {
        openErrorNotification();
      }
    },
    [status],
  );

  return (
    <div className="main">
      <CapRow type="flex">
        <CapColumn>
          <CapHeading type="h1"><FormattedMessage id="Product.add" /></CapHeading>
        </CapColumn>
        <CapColumn style={{ marginLeft: 'auto' }}>
          <CapButton onClick={goHome}><FormattedMessage id="Product.goBack" /></CapButton>
        </CapColumn>
      </CapRow>
      <CapRow className="form-item">
        <CapColumn span={11}>
          <CapInput
            labelPosition="top"
            label={intl.formatMessage({id:"Product.title"})}
            value={formData.title}
            name="title"
            placeholder={intl.formatMessage({id:"Product.enterTitle"})}
            onChange={handleFormChange}
          />
        </CapColumn>
      </CapRow>
      <CapRow className="form-item">
        <CapColumn span={11}>
          <CapInput
            labelPosition="top"
            label={intl.formatMessage({id:"Product.description"})}
            value={formData.description}
            name="description"
            placeholder={intl.formatMessage({id:"Product.enterDescription"})}
            onChange={handleFormChange}
          />
        </CapColumn>
      </CapRow>
      <CapRow className="form-item">
        <CapColumn span={11}>
          <CapInput
            labelPosition="top"
            label={intl.formatMessage({id:"Product.brand"})}
            value={formData.brand}
            name="brand"
            placeholder={intl.formatMessage({id:"Product.enterBrand"})}
            onChange={handleFormChange}
          />
        </CapColumn>
      </CapRow>
      <CapRow className="form-item">
        <CapColumn span={11}>
          <CapInput
            labelPosition="top"
            label={intl.formatMessage({id:"Product.category"})}
            value={formData.category}
            name="category"
            placeholder={intl.formatMessage({id:"Product.enterCategory"})}
            onChange={handleFormChange}
          />
        </CapColumn>
      </CapRow>
      <CapRow className="form-item">
        <CapColumn span={11}>
          <CapInput
            labelPosition="top"
            label={intl.formatMessage({id:"Product.price"})}
            value={formData.price}
            name="price"
            placeholder={intl.formatMessage({id:"Product.enterPrice"})}
            onChange={handleFormChange}
          />
        </CapColumn>
      </CapRow>
      <CapRow className="form-item">
        <CapColumn span={11}>
          <CapInput
            labelPosition="top"
            label={intl.formatMessage({id:"Product.stock"})}
            value={formData.stock}
            name="stock"
            placeholder={intl.formatMessage({id:"Product.enterStock"})}
            onChange={handleFormChange}
          />
        </CapColumn>
      </CapRow>
      <CapRow className="form-item">
        <CapButton
          disabled={buttonDisabled}
          onClick={() => {
            actions.setProducts(formData);
          }}
        >
          <FormattedMessage id="Product.submit" />
        </CapButton>
      </CapRow>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  newProductDetails: makeSelectNewProductDetails(),
  status: makeSelectProductStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'newProductDetail', saga });
const withReducer = injectReducer({ key: 'newProductDetail', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(injectIntl(withStyles(ProductAdd, styles)));
