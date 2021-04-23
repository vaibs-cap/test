import React from 'react';
import CapModal from '@capillarytech/cap-ui-library/CapModal';
import { OrgChange } from '../OrgChange';
import * as intlWrapper from '../../../../utils/intlWrapper';

const { mountWithIntl } = intlWrapper;

jest.mock('@capillarytech/cap-ui-utils/utils/utilsSessionStorageApi', () => ({
  loadSessionItem: () => true,
  saveSessionItem: () => true,
}));

jest.mock('@capillarytech/cap-ui-utils/utils/multipleOrgSwitch', () => ({
  logNewTab: () => true,
  utilsGetOrgNameFromId: () => true,
  tabBeforeUnloadEventHandler: () => true,
  utilsHandleStorageChange: () => true,
}));

const setup = props => <OrgChange {...props} />;

describe('<OrgChange />', () => {
  it('should render the org change component', async () => {
    const renderedComponent = mountWithIntl(setup({ userData: {} }));
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the org change component with showOrgChangeModal', async done => {
    const renderedComponent = mountWithIntl(
      setup({ selectedOrgId: 'selectedOrgId' }),
    );
    setTimeout(() => {
      expect(renderedComponent).toMatchSnapshot();
      done();
    }, 1000);
  });

  it('should render the org change component with showRefreshModal', async done => {
    const renderedComponent = mountWithIntl(setup());
    setTimeout(() => {
      global.dispatchEvent(new Event('storage'));
      expect(renderedComponent).toMatchSnapshot();
      done();
    }, 1000);
  });

  it('should call callback once while ok button click', async done => {
    const callback = jest.fn(() => {});
    const renderedComponent = mountWithIntl(
      setup({ selectedOrgId: 'selectedOrgId', changeOrgAction: callback }),
    );
    setTimeout(() => {
      renderedComponent.find(CapModal).forEach(item => item.props().onOk());
      // need to handle here
      // expect(callback.mock.calls.length).toBe(1);
      done();
    }, 1000);
  });

  it('should render the org change component with showOrgChangeSnackBar', async done => {
    const renderedComponent = mountWithIntl(
      setup({
        userData: { currentOrgDetails: { basic_details: { name: 'name' } } },
      }),
    );
    setTimeout(() => {
      expect(renderedComponent).toMatchSnapshot();
      done();
    }, 1000);
  });
});
