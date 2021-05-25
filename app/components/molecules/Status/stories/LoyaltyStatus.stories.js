import React from 'react';
import { storiesOf } from '@storybook/react';
import LoyaltyStatus from '../LoyaltyStatus';

storiesOf('LoyaltyStatus', module).add('default', () => (
  <LoyaltyStatus type="live" />
));
