import React from 'react';
import CapTable from '@capillarytech/cap-ui-library/CapTable/CapTable';
import { Pagination } from 'antd';
import { columns } from './columns';
import { injectIntl,intlShape } from 'react-intl';

const ProductTable = ({ products, setCurrent, total, current,showModal,intl}) => {
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
        ColumnGroup={columns(showModal,intl)}
        columns={columns(showModal,intl)}
        dataSource={products}
        className="hide-hover"
        pagination={false}
        rowKey={record => record.id}
      />
    </div>
  );
};

export default injectIntl(ProductTable);
