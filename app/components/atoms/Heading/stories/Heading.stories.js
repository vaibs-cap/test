import React from 'react';
import { storiesOf } from '@storybook/react';
import Heading from '../Heading';

storiesOf('Heading', module).add('default', () => (
  <Heading>Heading Text.</Heading>
));
