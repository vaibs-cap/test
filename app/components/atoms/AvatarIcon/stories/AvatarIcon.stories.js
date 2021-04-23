import React from 'react';
import { storiesOf } from '@storybook/react';
import AvatarIcon from '../AvatarIcon';

storiesOf('AvatarIcon', module).add('default', () => (
  <AvatarIcon
    text="AV"
    className="class-name"
    backgroundColor="red"
    textColor="#ffff"
  />
));
