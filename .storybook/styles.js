import { css } from 'styled-components';

export default css`
  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'Roboto', Arial, sans-serif;
    font-size: 14px;
    line-height: unset;
  }

  body.fontLoaded {
    font-family: 'Roboto', Arial, sans-serif;
  }

  #loyalty-app {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Roboto', Arial, sans-serif;
    line-height: 1.5em;
  }

  .loyalty-ui-app-body {
    .ant-popover,
    .ant-select-dropdown,
    .ant-select-dropdown.ant-select-dropdown--single,
    .ant-calendar-picker-container,
    .ant-notification,
    .ant-tooltip,
    .ant-modal-mask,
    .ant-modal-wrap {
      z-index: 10003; /* setting z-index, to be able to show the contect on top of slidebox */
    }
  }
  
  ul, ol {
    list-style: none;
    padding: 0;
  }
`;
