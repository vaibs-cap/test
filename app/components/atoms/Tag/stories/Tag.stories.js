import React from 'react';
import { storiesOf } from '@storybook/react';
import Tag from '../Tag';

storiesOf('Tag', module).add('default', () => (
  <Tag
    height="16px"
    background="blue"
    font="#ffff"
    borderadius="8px"
    className="class-name"
    tagText="Custom Cap Tag"
  />
));
