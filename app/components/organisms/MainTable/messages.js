/*
 * LoyaltyDetail Messages
 *
 * This contains all the text for the LoyaltyDetail component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'loyaltyPlus.components.organisms.LoyaltyDetail';

export default defineMessages({
  conceptsMapped: {
    id: `${scope}.conceptsMapped`,
    defaultMessage: 'Concepts mapped',
  },
  defaultProgramInductiveText: {
    id: `${scope}.defaultProgramInductiveText`,
    defaultMessage:
      'This is the default program. The default cannot be changed and provides extra functionality over the other programs. Please refer to help section to know more',
  },
  totalLoyaltyBase: {
    id: `${scope}.totalLoyaltyBase`,
    defaultMessage: 'Total Loyalty Base',
  },
  RegdMTD: {
    id: `${scope}.RegdMTD`,
    defaultMessage: 'Regd. MTD',
  },
  activeMembers: {
    id: `${scope}.activeMembers`,
    defaultMessage: 'Active Members',
  },
  churnRate: {
    id: `${scope}.churnRate`,
    defaultMessage: 'Churn Rate',
  },
  percentOfTotalSales: {
    id: `${scope}.percentOfTotalSales`,
    defaultMessage: '% of Total Sales',
  },
  loyaltyLifetimeValue: {
    id: `${scope}.loyaltyLifetimeValue`,
    defaultMessage: 'Loyalty Lifetime Value',
  },
  avgLoyaltyLifetime: {
    id: `${scope}.avgLoyaltyLifetime`,
    defaultMessage: 'Avg. Loyalty Lifetime',
  },
  issueWithRules: {
    id: `${scope}.issueWithRules`,
    defaultMessage: 'Issue with rules',
  },
  defaultProgram: {
    id: `${scope}.defaultProgram`,
    defaultMessage: 'Default Program',
  },
  updatedBy: {
    id: `${scope}.updatedBy`,
    defaultMessage: 'Updated By',
  },
  date: {
    id: `${scope}.date`,
    defaultMessage: 'Date',
  },
});
