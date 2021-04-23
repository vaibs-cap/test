import { css } from 'styled-components';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';

const {
  CAP_SPACE_52,
  CAP_SPACE_64,
  CAP_SPACE_12,
  CAP_SPACE_20,
  CAP_SPACE_24,
  CAP_SPACE_32,
} = styledVars;

export default css`
  padding-top: ${CAP_SPACE_64};

  .loyalty-detail-table-row {
    min-height: ${CAP_SPACE_64};
  }

  .loyalty-detail-table-header-row {
    min-height: ${CAP_SPACE_32};
  }

  .ant-table-header-column {
    width: 100%;
  }

  .detail-head-row-container {
    padding: 0 0 ${CAP_SPACE_12} 0;
  }

  .cap-table-v2 .ant-table .ant-table-thead > tr > th,
  .cap-table-v2 .ant-table .ant-table-tbody > tr > td {
    padding: ${CAP_SPACE_20} ${CAP_SPACE_24} ${CAP_SPACE_20} ${CAP_SPACE_20};

    .ant-table-column-sorter {
      display: none;
    }
  }

  .loyalty-detail-table-header-name {
    padding-left: ${CAP_SPACE_52};
  }
`;
