import React from 'react';
import { storiesOf } from '@storybook/react';
import RowHeader from '../RowHeader';

storiesOf('RowHeader', module).add('default', () => (
  <RowHeader title="Row Header" buttonText="Button" showSync showButton />
));
