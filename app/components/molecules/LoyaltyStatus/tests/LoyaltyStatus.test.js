import React from 'react';
import { LoyaltyStatus } from '../LoyaltyStatus';
import * as intlWrapper from '../../../../utils/intlWrapper';
import mockdata from './mockdata';

const { shallowWithIntl } = intlWrapper;

const setup = props => <LoyaltyStatus {...props} />;

describe('<LoyaltyStatus />', () => {
  it('should render the status component with type live,ended and invalid', () => {
    mockdata.forEach(type => {
      const renderedComponent = shallowWithIntl(setup({ type }));
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
