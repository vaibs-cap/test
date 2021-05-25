import React from 'react';
import { FormattedMessage } from 'react-intl';
import CapImage from '@capillarytech/cap-ui-library/CapImage';
import withStyles from 'utils/withStyles';
import styles from './style';
import messages from './messages';
import PageTemplate from '../../templates/PageTemplate';
import NotFoundImage from '../../../assets/empty.svg';
import Heading from '../../atoms/Heading';

export const NotFoundPage = () => (
  <PageTemplate>
    <CapImage src={NotFoundImage} />
    <Heading>
      <FormattedMessage {...messages.header} />
    </Heading>
  </PageTemplate>
);

export default withStyles(NotFoundPage, styles);
