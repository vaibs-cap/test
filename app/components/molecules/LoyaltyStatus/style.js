import styled from 'styled-components';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';
import StatusColor from '../../atoms/StatusColor';

const { CAP_SPACE_04 } = styledVars;

export const StatusIcon = styled(StatusColor)`
  margin-right: ${[props => props.spacing || CAP_SPACE_04]};
`;
