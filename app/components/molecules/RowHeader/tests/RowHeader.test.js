import React from 'react';
import { mount } from 'enzyme';
import CapButton from '@capillarytech/cap-ui-library/CapButton';
import { RowHeader } from '../RowHeader';

const setup = props => <RowHeader {...props} />;

const event = {
  target: {},
};

describe('<RowHeader />', () => {
  it('should render the row header component', () => {
    const renderedComponent = mount(setup());
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the row header component with sync label', () => {
    const renderedComponent = mount(
      setup({
        showSync: true,
        lastSyncTime: '2013-11-06',
      }),
    );
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should call callback once on row button click in row header component', () => {
    const callBack = jest.fn(() => {});
    const renderedComponent = mount(
      setup({
        showButton: true,
        onButtonClick: callBack,
      }),
    );
    renderedComponent
      .find(CapButton)
      .at(0)
      .simulate('click', event);
    expect(callBack.mock.calls.length).toBe(1);
  });
});
