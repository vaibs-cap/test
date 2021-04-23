import styled from 'styled-components';

export default styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.color};
  border-radius: 50%;
  display: inline-block;
`;
