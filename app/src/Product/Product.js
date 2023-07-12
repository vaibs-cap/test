import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';

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
import CapModal from '@capillarytech/cap-ui-library/CapModal';

import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import * as types from './constants';
import saga from './saga';
import reducer from './reducer';
import {styles} from './style';
import withStyles from '../../utils/withStyles';
import { getData } from './actions';
import { makeSelectProductDetails } from './selectors';

export const Product = ({ actions, productDetails }) => {
  const { Search } = CapInput;
  const {CapCustomSelect} = CapSelect;

  console.log('prod...', productDetails.products);

  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [selectedCat, handleCatChange] = useState(null);
  const [modalVisibility,setModalVisibility] = useState(false);
  const [modalData,setModalData] = useState([]);

  console.log(categories)

  const showModal = (record) => {
    console.log(record);
    setModalData(record);
    setModalVisibility(true);
  };

  const handleOk = () => {
    setModalVisibility(false);
  };

  const handleCancel = () => {
    setModalVisibility(false);
  };

  const clearSelection =() => {
    handleCatChange("");
  }

  const handleChange = async event => {
    await setQuery(event.target.value);
    actions.getProducts(query,selectedCat);
  };

  useEffect(()=>{ const categories=fetch('http://localhost:3000/products/categories')
  .then(res => res.json()).then(res=>{
    const catObj=res.map(e=>({label:e,value:e}));
    setCategories(catObj  );
  })

} ,[])

  useEffect(
    () => {
      setProducts(productDetails.products);
      console.log('after fetch');
    },
    [productDetails],
  );
  const columns = [
    {
      title: (
        <CapHeader
          size="regular"
          title="Product Title"
          description="The product"
        />
      ),
      dataIndex: 'title',
      key: 'title',
      width: '50%',
    },
    {
      title: (
        <CapHeader size="regular" title="Category" withHiddenDescription />
      ),
      dataIndex: 'category',
      key: 'category',
      width: '20%',
    },
    {
      title: <CapHeader size="regular" title="Price" withHiddenDescription />,
      dataIndex: 'price',
      key: 'price',
      width: '20%',
    },
    {
      title: <CapHeader size="regular" title="Action" withHiddenDescription />,
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => showModal(record)}>View</a>
        </span>
      ),
      width: '10%'
    }
  ];

  return (
    <div className="background">
      <CapHeading type="h1">Products</CapHeading>
      <CapRow type="flex" style={{ gap: '1rem' }}>
        <CapColumn className="column-item">
          <Search placeholder="Enter value" onChange={handleChange} />
        </CapColumn>
        <CapColumn className="column-item">
          <CapDateRangePicker />
        </CapColumn>
        <CapColumn className="column-item" span={3}>
          <CapCustomSelect
                  width="150px"
                  selectPlaceholder="Select"
                  showSearch
                  options={categories}
                  value={selectedCat}
                  onChange={handleCatChange}
          />

        </CapColumn>
        <CapColumn className="column-item">
          <CapIcon onClick={clearSelection} type="filter" />
        </CapColumn>
        <CapColumn
          className="column-item"
          span={3}
          style={{ marginLeft: 'auto' }}
        >
          <CapButton
            onClick={() => {
              actions.getProducts(query,selectedCat);
            }}
          >
            Search
          </CapButton>
        </CapColumn>
      </CapRow>
      <CapTable
        id="capTable_1"
        ColumnGroup={columns}
        columns={columns}
        dataSource={products}
        className="hide-hover"
      />
      <CapModal
        title="Product Details"
        visible={modalVisibility}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {console.log(modalData)} 
        <div className='modal-content'>
        <img src={modalData.thumbnail}/>
        <h1>{modalData.title}</h1>
        <h2>{modalData.brand}</h2>
        <h3>{modalData.description}</h3>
        <h3>${modalData.price}</h3>
        </div>
      </CapModal>
    </div>
  );
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
)(withStyles(Product, styles));
