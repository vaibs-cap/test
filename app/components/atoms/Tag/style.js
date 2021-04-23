import { css } from 'styled-components';

export default css`
  &.ant-tag.cap-tag-v2 {
    height: ${props => props.height};
    background-color: ${props => props.background};
    color: ${props => props.font};
    border-radius: ${props => props.borderadius};
    display: inline-block;
  }
`;
