import styled from 'styled-components';

export default (WrappedComponent, styles) => {
  const StyledComponent = styled(WrappedComponent)`
    ${styles};
  `;
  StyledComponent.defaultProps = WrappedComponent.defaultProps;
  return StyledComponent;
};
