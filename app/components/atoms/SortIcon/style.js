import { css } from 'styled-components';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';

const {
  CAP_SPACE_04,
  CAP_SPACE_08,
  FONT_SIZE_VS,
  FONT_COLOR_04,
  FONT_COLOR_01,
} = styledVars;

export default css`
  &.sort-icon-container {
    display: flex;
    flex-direction: column;
    font-size: ${FONT_SIZE_VS};
    margin-left: ${CAP_SPACE_08};
  }

  .sort-table-icon-caret-down {
    margin-top: -3px;
  }

  .sort-table-icon {
    color: ${FONT_COLOR_04};

    &.selected {
      color: ${FONT_COLOR_01};
    }
  }
`;
