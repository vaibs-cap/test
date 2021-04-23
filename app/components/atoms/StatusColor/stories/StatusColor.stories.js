import React from 'react';
import { storiesOf } from '@storybook/react';
import StatusColor from '../StatusColor';

storiesOf('StatusColor', module).add('default', () => (
  <StatusColor colorType="completed" width="8px" height="8px" />
));
