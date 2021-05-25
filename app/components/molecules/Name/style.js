import { css } from 'styled-components';
import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';

const {
  CAP_SPACE_52,
  CAP_SPACE_04,
  CAP_SPACE_20,
  CAP_SPACE_08,
  CAP_YELLOW02,
} = styledVars;

export default css`
  .favorite-icon {
    font-size: 18px;
    color: ${CAP_YELLOW02};
    padding-left: ${CAP_SPACE_08};
  }

  .program-name-container {
    align-items: flex-start;

    .program-name {
      display: flex;
      align-items: center;
    }

    .program-name-text {
      width: auto;
      max-width: 100%;
      line-height: ${CAP_SPACE_20};
    }
  }

  .program-desc {
    white-space: inherit;
  }

  .avatar-icon {
    margin-right: ${CAP_SPACE_20};
  }

  .custom-tag{
    margin: ${CAP_SPACE_04} 0 0 ${CAP_SPACE_52};
  }
`;
