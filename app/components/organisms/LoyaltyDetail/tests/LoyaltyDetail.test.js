import React from 'react';
import CapTable from '@capillarytech/cap-ui-library/CapTable';
import { LoyaltyDetail } from '../LoyaltyDetail';
import * as intlWrapper from '../../../../utils/intlWrapper';
import * as actions from '../actions';
import * as mockdata from './mockdata';

const { chartDetails, lastSyncTime, programDetails, usersList } = mockdata;
const { shallowWithIntl, mountWithIntl } = intlWrapper;

jest.mock('../../../organisms/CreateProgram');

const setup = props => (
  <LoyaltyDetail actions={actions} loyaltyDetails={{}} {...props} />
);

describe('<LoyaltyDetail />', () => {
  it('should render the Loyalty Detail table and header', () => {
    const renderedComponent = shallowWithIntl(setup({ publicPath: '' }));
    expect(renderedComponent).toMatchSnapshot();
  });

  it('Push history while table row clicks', () => {
    const history = [];
    const renderedComponent = mountWithIntl(
      setup({
        history,
        programDetails,
        loyaltyDetails: { usersList },
        configKpiData: { chartDetails },
        lastSyncData: { lastSyncTime },
        showSlideBox: true,
      }),
    );

    renderedComponent
      .find(CapTable)
      .props()
      .onRow({ messageId: 'messageId2' })
      .onClick();

    expect(history.length).toBe(1);
  });
});
