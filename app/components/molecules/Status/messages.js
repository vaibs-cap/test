/*
 * LoyaltyStatus Messages
 *
 * This contains all the text for the LoyaltyStatus component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'loyaltyPlus.components.molecules.LoyaltyStatus';

export default defineMessages({
  live: {
    id: `${scope}.live`,
    defaultMessage: 'Live',
  },
  ended: {
    id: `${scope}.ended`,
    defaultMessage: 'Ended',
  },
  invalid: {
    id: `${scope}.invalid`,
    defaultMessage: 'Invalid',
  },
});
