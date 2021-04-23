import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import PageTemplate from '../../templates/PageTemplate';
import Heading from '../../atoms/Heading';

export const NotFoundPage = () => (
  <PageTemplate>
    <Heading>
      <FormattedMessage {...messages.header} />
    </Heading>
  </PageTemplate>
);

export default NotFoundPage;
