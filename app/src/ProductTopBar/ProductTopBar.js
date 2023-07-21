import React from 'react'
import CapColumn from '@capillarytech/cap-ui-library/CapColumn'
import CapRow from '@capillarytech/cap-ui-library/CapRow'
import CapInput from '@capillarytech/cap-ui-library/CapInput';
import CapSelect from '@capillarytech/cap-ui-library/CapSelect';
import CapDateRangePicker from '@capillarytech/cap-ui-library/CapDateRangePicker';
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';
import CapButton from '@capillarytech/cap-ui-library/CapButton';

import history from 'utils/history';

const { Search } = CapInput;
const { CapCustomSelect } = CapSelect;

const ProductTopBar = ({handleChange,query,categories,selectedCat,handleCatChange,clearSelection}) => {



  const gotoAdd = () => {
    history.push('/product/add')
  }

  return (
    <div>
      <CapRow type="flex" style={{ gap: '1rem' }}>
        <CapColumn className="column-item">
          <Search placeholder="Enter value" onChange={handleChange} value={query} />
        </CapColumn>
        <CapColumn className="column-item">
          <CapDateRangePicker />
        </CapColumn>
        <CapColumn className="column-item" span={3}>
          <CapCustomSelect width="150px" selectPlaceholder="Select Option" showSearch options={categories} value={selectedCat} onChange={handleCatChange} />
        </CapColumn>
        <CapColumn className="column-item">
          <CapIcon onClick={clearSelection} type="filter" />
        </CapColumn>
        <CapColumn className="column-item" span={3} style={{ marginLeft: 'auto' }}>
          <CapButton onClick={gotoAdd}>Add Product</CapButton>
        </CapColumn>
      </CapRow>
    </div>
  )
}

export default ProductTopBar
