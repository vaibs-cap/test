import React, { useEffect, useState } from 'react';
import { getData } from './actions';
import withStyles from '../../utils/withStyles'
import styles from './style'
import './styles.css'


import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapColumn from '@capillarytech/cap-ui-library/CapColumn';
import CapInput from '@capillarytech/cap-ui-library/CapInput';
import CapSelect from '@capillarytech/cap-ui-library/CapSelect';
import CapDateRangePicker from '@capillarytech/cap-ui-library/CapDateRangePicker';
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import CapTable from '@capillarytech/cap-ui-library/CapTable/CapTable';
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';

import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import * as actions from './actions'
import * as types from './constants'
import saga from './saga';
import reducer from './reducer';
import { createStructuredSelector } from 'reselect';
import { makeSelectProductDetails } from './selectors';


export const Product = ({actions,productDetails}) => {
  const {Search}=CapInput;

  console.log("prod...",typeof(productDetails.products))

  const [query,setQuery]=useState('?limit=10&skip=10');
  const [products,setProducts]=useState([]);

  const handleChange = (event) => {
    setQuery('search?q='+event.target.value);
    console.log(query)
  }

  useEffect(()=>{
    setProducts(productDetails.products);
    console.log("after fetch");
  },[productDetails])
  const categories = [
    {
      key: 'approved',
      value: 'APPROVED',
      label: 'Approved',
    },
    {
      key: 'completed',
      value: 'COMPLETED',
      label: 'Completed',
    },
    {
      key: 'draft',
      value: 'DRAFT',
      label: 'Draft',
    },
  ];  

  

  const columns = [{
    title: <CapHeader size="regular" title="Product Title" description="The product" />,
    dataIndex: 'title',
    key: 'title',
    width: '50%',
  }, {
    title: <CapHeader size="regular" title="Category" withHiddenDescription />,
    dataIndex: 'category',
    key: 'category',
    width: '30%',
  }, {
    title: <CapHeader size="regular" title="Price" withHiddenDescription />,
    dataIndex: 'price',
    key: 'price',
    width: '20%',
  }];

  return (
    <div className='background'>
      <CapHeading type="h1">Campaigns</CapHeading>
      <CapRow type="flex" style={{gap:"1rem"}}>
      <CapColumn className='column-item'>
            <Search placeholder="Enter value" onChange={handleChange} />
        </CapColumn>
        <CapColumn className='column-item'>
            <CapDateRangePicker />
        </CapColumn>
        <CapColumn className='column-item' span={3}>
          <CapSelect placement="bottomLeft"
        options={categories}
        style={{ width: 150, borderRadius:"200px"}}
        placeholder="Organisations"/>
        </CapColumn>
        <CapColumn className='column-item'>
        <CapIcon type="filter" />
        </CapColumn>
        <CapColumn className='column-item' span={3} style={{marginLeft:"auto"}}>
          <CapButton onClick={()=>{actions.getProducts("http://localhost:3000/products/"+query);}}>Search</CapButton>
        </CapColumn>
      </CapRow>
      <CapTable id="capTable_1" ColumnGroup={columns} columns={columns} dataSource={products} className="hide-hover" />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  productDetails:makeSelectProductDetails(),
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
)  (withStyles(Product,styles));
