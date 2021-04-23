import React from 'react';
import { SyncLabel } from '../SyncLabel';

import * as intlWrapper from '../../../../utils/intlWrapper';

const { mountWithIntl } = intlWrapper;

const setup = props => <SyncLabel {...props} />;

describe('<SyncLabel />', () => {
  it('should render the sync label component', () => {
    const renderedComponent = mountWithIntl(setup());
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render the sync label component with last sync data', () => {
    const renderedComponent = mountWithIntl(
      setup({ lastSyncTime: '2021-01-27T17:50:00.000+0530' }),
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
