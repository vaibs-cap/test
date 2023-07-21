import CapHeader from "@capillarytech/cap-ui-library/CapHeader";
import React from "react";

export const columns = (showModal) => [
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