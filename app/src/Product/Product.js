import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';


import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import CapModal from '@capillarytech/cap-ui-library/CapModal';

import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import saga from './saga';
import reducer from './reducer';
import {styles} from './style';
import withStyles from 'utils/withStyles';
import { makeSelectProductDetails } from './selectors';
import ProductTable from '../ProductTable';
import ProductTopBar from '../ProductTopBar';
import { injectIntl, FormattedMessage } from 'react-intl';

export const Product = ({ actions, productDetails }) => {
  
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [total,setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  
  
  useEffect(()=>{ 
    actions.getCategories();
  } ,[])

  useEffect(()=>{
    if(productDetails.categories)
      setCategories(productDetails.categories.map(e=>({label:e,value:e,key:e})));

  },[productDetails?.categories])
  useEffect(
    () => {
      setProducts(productDetails?.products?.data);
      setTotal(productDetails?.products?.total);
    },
    [productDetails],
  );

  const [selectedCat, setSelectedCat] = useState(null);
  const [modalVisibility,setModalVisibility] = useState(false);
  const [modalData,setModalData] = useState([]);

  useEffect(()=>{
    actions.getProducts(query,selectedCat,current);
  },[selectedCat,query,current])
  
  const showModal = (record) => {
    setModalData(record);
    setModalVisibility(true);
  };

  const handleCancel = () => {
    setModalVisibility(false);
  };

  const clearSelection =() => {
    setSelectedCat("");
    setQuery("");
  }

  const handleCatChange = value => {
    setSelectedCat(value);
    setCurrent(1);
  }

  const handleChange = event => {
    setQuery(event.target.value);
    setCurrent(1);
  };

  
  

  return <div className="background">
      <CapHeading type="h1"><FormattedMessage id="Product.heading" /></CapHeading>
      <ProductTopBar handleChange={handleChange} handleCatChange={handleCatChange} query={query} categories={categories} selectedCat={selectedCat} clearSelection={clearSelection} />
      <ProductTable products={products} setCurrent={setCurrent} total={total} current={current} showModal={showModal} />
      <CapModal title="Product Details" visible={modalVisibility} onOk={handleCancel} onCancel={handleCancel}>
        <div className="modal-content">
          <img src={modalData.thumbnail} />
          <h1>{modalData.title}</h1>
          <h2>{modalData.brand}</h2>
          <h3>{modalData.description}</h3>
          <h3>${modalData.price}</h3>
        </div>
      </CapModal>
    </div>;
};

const mapStateToProps = createStructuredSelector({
  productDetails: makeSelectProductDetails(),
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

const withSaga = injectSaga({ key: 'productDetail', saga });
const withReducer = injectReducer({ key: 'productDetail', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(injectIntl(withStyles(Product, styles)));
