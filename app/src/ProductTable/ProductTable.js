import React from 'react';
import CapTable from '@capillarytech/cap-ui-library/CapTable/CapTable';
import { Pagination } from 'antd';
import { columns } from './columns';

const ProductTable = ({ products, setCurrent, total, current,showModal }) => {
  return (
    <div>
      <Pagination
        onChange={setCurrent}
        total={total}
        current={current}
        pageSize={10}
      />
      <CapTable
        id="capTable_1"
        ColumnGroup={columns(showModal)}
        columns={columns(showModal)}
        dataSource={products}
        className="hide-hover"
        pagination={false}
        rowKey={record => record.id}
      />
    </div>
  );
};

export default ProductTable;
