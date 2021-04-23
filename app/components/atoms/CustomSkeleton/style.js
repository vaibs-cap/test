import { css } from 'styled-components';

export default css`
  &.custom-skeleton {
    width: ${props => props.width || `100%`};
    height: ${props => props.height || `100%`};
    .ant-skeleton-title {
      height: 100%;
      margin: 0;
      padding: 0;
      border-radius: ${props => props.borderRadius || `initial`};
    }
    .ant-skeleton-paragraph {
      margin: 0 !important;
      padding: 0;
    }
  }
`;
