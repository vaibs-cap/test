import { css } from 'styled-components';

export default css`
  .requests-container {
    width: 85vw;
    margin: auto;
    padding: 20px 0;
  }

  .top-section {
    margin-left: 20px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: space-between;
  }
  .heading-text {
    margin-left: 20px;
    font-size: 2.5rem;
    color: orange;
  }
   .search-field1 {
    margin-left: 15px;
    width: 250px;
   }
   .search-field2 {
    margin-left: 15px;
   }

  .input-field {
    width: 100%;
    margin-bottom: 20px;
  }

  .ant-modal.cap-modal-v2 {
    max-width: 1000px !important;
  }

  .ant-input-group-addon {
    width: 20%;
  }

  .search-section {
    margin-bottom: 20px;
    width: 40%;
    justify-content: space-between;
    align-items: center;
  }

  .ant-select-selection {
    width: 200px !important;
  }
`;
