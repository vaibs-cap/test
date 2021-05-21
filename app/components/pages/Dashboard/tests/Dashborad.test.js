import React from 'react';
import { Dashboard } from '../Dashboard';
import * as intlWrapper from '../../../../utils/intlWrapper';
import * as actions from '../actions';

const { shallowWithIntl } = intlWrapper;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: f => f(),
}));

const setup = props => <Dashboard actions={actions} {...props} />;

describe('<Dashboard />', () => {
  it('should render the dashboard component', async () => {
    const renderedComponent = shallowWithIntl(setup());
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the dashboard component with program data', async () => {
    const dashboardDatas = { programDetails: [{}] };
    const renderedComponent = shallowWithIntl(setup({ dashboardDatas }));
    expect(renderedComponent).toMatchSnapshot();
  });
});
