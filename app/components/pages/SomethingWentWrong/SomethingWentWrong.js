import React, { useCallback } from 'react';
import { CapHeading, CapButton } from '@capillarytech/cap-ui-library';
import { CAP_SECONDARY } from '@capillarytech/cap-ui-library/styled/variables';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import messages from './messages';
import repairImage from '../../../assets/repair.png';
import { publicPath } from '../../../config/path';

const SomethingWentWrongContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const SomethingWentWrong = () => {
  const onClickReload = useCallback(() => {
    if (window.location.pathname.includes('somethingwentwrong')) {
      window.location = `${window.location.origin}${publicPath}/list`;
    } else {
      window.location.reload();
    }
  }, []);

  return (
    <SomethingWentWrongContainer>
      <img src={repairImage} alt="" />
      <CapHeading type="h3" className="margin-t-34">
        <FormattedMessage {...messages.somethingWentWrongTitle} />
      </CapHeading>
      <CapHeading type="h5" className="margin-t-8">
        <FormattedMessage {...messages.somethingWentWrongDesc} />
      </CapHeading>
      <CapButton
        type="link"
        className="margin-t-16 try-refreshing-btn"
        style={{ color: CAP_SECONDARY.base }}
        onClick={onClickReload}
      >
        <FormattedMessage {...messages.tryRefreshing} />
      </CapButton>
    </SomethingWentWrongContainer>
  );
};

export default SomethingWentWrong;
