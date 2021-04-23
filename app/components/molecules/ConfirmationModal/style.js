import styled, { css } from 'styled-components';
import StyledVars from '@capillarytech/cap-ui-library/styled';

const {
  CAP_SPACE_20,
  FONT_WEIGHT_MEDIUM,
  CAP_SPACE_12,
  CAP_SPACE_32,
} = StyledVars;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${CAP_SPACE_32};
`;

export const CapModalStyles = css`
  .ant-modal.cap-modal-v2 {
    max-width: unset;
  }

  .ant-modal-footer {
    text-align: left;
    margin-left: 125px;
  }
  .ant-modal-header {
    margin-left: 120px;
  }

  .modal-img {
    float: left;
    width: 100px;
    margin-right: ${CAP_SPACE_20};
  }

  .remove-account-account-name {
    padding-top: ${CAP_SPACE_12};
    font-weight: ${FONT_WEIGHT_MEDIUM};
  }
`;
