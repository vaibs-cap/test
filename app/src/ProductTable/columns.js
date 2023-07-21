import CapHeader from "@capillarytech/cap-ui-library/CapHeader";
import React from "react";
import { injectIntl } from "react-intl";


export const columns = (showModal,intl) => [
    {
      title: (
        <CapHeader
          size="regular"
          title={intl.formatMessage({id:"Product.title"})}
          description={intl.formatMessage({id:"Product.description"})}
        />
      ),
      dataIndex: 'title',
      key: 'title',
      width: '50%',
    },
    {
      title: (
        <CapHeader size="regular" title={intl.formatMessage({id:"Product.category"})} withHiddenDescription />
      ),
      dataIndex: 'category',
      key: 'category',
      width: '20%',
    },
    {
      title: <CapHeader size="regular" title={intl.formatMessage({id:"Product.price"})} withHiddenDescription />,
      dataIndex: 'price',
      key: 'price',
      width: '20%',
    },
    {
      title: <CapHeader size="regular" title={intl.formatMessage({id:"Product.action"})} withHiddenDescription />,
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => showModal(record)}>View</a>
        </span>
      ),
      width: '10%'
    }
  ];