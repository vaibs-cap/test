import React from 'react';
import { storiesOf } from '@storybook/react';
import RenderRoute from '../RenderRoute';
import NotFoundPage from '../../../pages/NotFoundPage';

storiesOf('RenderRoute', module).add('default', () => (
  <RenderRoute component={NotFoundPage} />
));
