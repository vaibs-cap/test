/*
 * SomethingWentWrong Messages
 *
 * This contains all the text for the SomethingWentWrong component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'loyaltyPlus.components.pages.SomethingWentWrong';

export default defineMessages({
  somethingWentWrongTitle: {
    id: `${scope}.somethingWentWrongTitle`,
    defaultMessage: 'Sorry, something went wrong.',
  },
  somethingWentWrongDesc: {
    id: `${scope}.somethingWentWrongDesc`,
    defaultMessage:
      'Please try again. If this issue occurs again, please reach out to Capillary support team.',
  },
  tryRefreshing: {
    id: `${scope}.tryRefreshing`,
    defaultMessage: 'Try refreshing again',
  },
});
